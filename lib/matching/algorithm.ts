/**
 * Matching Algorithm for MeddyCare
 * Matches families with suitable carers based on multiple criteria
 */

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface MatchCriteria {
    careRequestId: string;
    maxDistance?: number; // in kilometers
    minMatchScore?: number; // 0-100
}

interface MatchResult {
    carerId: string;
    carer: any;
    matchScore: number;
    breakdown: {
        locationScore: number;
        specializationScore: number;
        experienceScore: number;
        budgetScore: number;
        availabilityScore: number;
    };
}

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

/**
 * Calculate location score (0-100)
 * Closer = higher score
 */
function calculateLocationScore(
    familyLat: number | null,
    familyLng: number | null,
    carerLat: number | null,
    carerLng: number | null
): number {
    if (!familyLat || !familyLng || !carerLat || !carerLng) {
        return 50; // Default score if location data is missing
    }

    const distance = calculateDistance(
        Number(familyLat),
        Number(familyLng),
        Number(carerLat),
        Number(carerLng)
    );

    // Score decreases with distance
    // 0-10km: 100 points
    // 10-25km: 80 points
    // 25-50km: 60 points
    // 50-100km: 40 points
    // 100+km: 20 points
    if (distance <= 10) return 100;
    if (distance <= 25) return 80;
    if (distance <= 50) return 60;
    if (distance <= 100) return 40;
    return 20;
}

/**
 * Calculate specialization match score (0-100)
 */
function calculateSpecializationScore(
    recipientNeeds: string[],
    carerSpecializations: string[]
): number {
    if (recipientNeeds.length === 0) return 50; // No specific needs

    const matchedNeeds = recipientNeeds.filter((need) =>
        carerSpecializations.some((spec) =>
            spec.toLowerCase().includes(need.toLowerCase())
        )
    );

    const matchPercentage = (matchedNeeds.length / recipientNeeds.length) * 100;
    return Math.round(matchPercentage);
}

/**
 * Calculate experience score (0-100)
 */
function calculateExperienceScore(yearsExperience: number): number {
    // More experience = higher score
    // 0-1 years: 40 points
    // 1-3 years: 60 points
    // 3-5 years: 80 points
    // 5+ years: 100 points
    if (yearsExperience >= 5) return 100;
    if (yearsExperience >= 3) return 80;
    if (yearsExperience >= 1) return 60;
    return 40;
}

/**
 * Calculate budget compatibility score (0-100)
 */
function calculateBudgetScore(
    familyBudgetMin: number,
    familyBudgetMax: number,
    carerRate: number | null
): number {
    if (!carerRate) return 50; // No rate set

    if (carerRate >= familyBudgetMin && carerRate <= familyBudgetMax) {
        return 100; // Perfect match
    }

    if (carerRate < familyBudgetMin) {
        // Carer is cheaper than budget
        return 90; // Still good
    }

    // Carer is more expensive
    const overage = ((carerRate - familyBudgetMax) / familyBudgetMax) * 100;
    if (overage <= 10) return 70; // 10% over budget
    if (overage <= 20) return 50; // 20% over budget
    if (overage <= 30) return 30; // 30% over budget
    return 10; // More than 30% over budget
}

/**
 * Calculate availability score (0-100)
 */
function calculateAvailabilityScore(
    carerStatus: string,
    hasActivePlacements: boolean
): number {
    if (carerStatus !== 'approved') return 0; // Not approved
    if (hasActivePlacements) return 50; // Has active placements
    return 100; // Available and approved
}

/**
 * Find matches for a care request
 */
export async function findMatches(
    criteria: MatchCriteria
): Promise<MatchResult[]> {
    const { careRequestId, maxDistance = 100, minMatchScore = 50 } = criteria;

    // Get care request with family and recipient details
    const careRequest = await prisma.careRequest.findUnique({
        where: { id: careRequestId },
        include: {
            family: true,
            recipient: true,
        },
    });

    if (!careRequest) {
        throw new Error('Care request not found');
    }

    // Get all approved carers with their specializations and rates
    const carers = await prisma.carer.findMany({
        where: {
            status: 'approved',
            dbsVerified: true,
        },
        include: {
            specializations: true,
            rates: {
                where: {
                    careType: careRequest.careType,
                },
            },
            placements: {
                where: {
                    status: 'active',
                },
            },
        },
    });

    const matches: MatchResult[] = [];

    for (const carer of carers) {
        // Calculate individual scores
        const locationScore = calculateLocationScore(
            careRequest.family.lat,
            careRequest.family.lng,
            carer.lat,
            carer.lng
        );

        // Extract specialization needs from recipient
        const recipientNeeds: string[] = [];
        if (careRequest.recipient.medicalConditions) {
            recipientNeeds.push(careRequest.recipient.medicalConditions);
        }
        const carerSpecs = carer.specializations.map((s) => s.specialization);
        const specializationScore = calculateSpecializationScore(
            recipientNeeds,
            carerSpecs
        );

        const experienceScore = calculateExperienceScore(carer.yearsExperience);

        const carerRate = carer.rates[0]?.weeklyRate
            ? Number(carer.rates[0].weeklyRate)
            : null;
        const budgetScore = calculateBudgetScore(
            Number(careRequest.budgetMin),
            Number(careRequest.budgetMax),
            carerRate
        );

        const availabilityScore = calculateAvailabilityScore(
            carer.status,
            carer.placements.length > 0
        );

        // Calculate weighted overall score
        const matchScore = Math.round(
            locationScore * 0.3 +
            specializationScore * 0.25 +
            experienceScore * 0.2 +
            budgetScore * 0.15 +
            availabilityScore * 0.1
        );

        // Only include if meets minimum score
        if (matchScore >= minMatchScore) {
            matches.push({
                carerId: carer.id,
                carer,
                matchScore,
                breakdown: {
                    locationScore,
                    specializationScore,
                    experienceScore,
                    budgetScore,
                    availabilityScore,
                },
            });
        }
    }

    // Sort by match score (highest first)
    matches.sort((a, b) => b.matchScore - a.matchScore);

    return matches;
}

/**
 * Create match records in database
 */
export async function createMatchRecords(
    careRequestId: string,
    matches: MatchResult[]
): Promise<void> {
    for (const match of matches) {
        await prisma.match.create({
            data: {
                careRequestId,
                carerId: match.carerId,
                matchScore: match.matchScore,
                status: 'suggested',
            },
        });
    }
}
