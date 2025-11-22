import { prisma } from '@/lib/prisma';

/**
 * Smart matching algorithm to find suitable carers for a care request
 * Scores carers based on: location, specializations, experience, rating, availability
 */
export async function findMatches(careRequestId: string) {
    // Get care request details
    const careRequest = await prisma.careRequest.findUnique({
        where: { id: careRequestId },
        include: {
            recipient: true,
            family: true,
        },
    });

    if (!careRequest) {
        throw new Error('Care request not found');
    }

    // Extract required specializations from medical conditions/requirements
    const requiredSpecs = extractRequiredSpecializations(
        careRequest.recipient.medicalConditions,
        careRequest.recipient.mobilityLevel
    );

    // Find potentially matching carers
    const carers = await prisma.carer.findMany({
        where: {
            status: 'approved',
            rates: {
                some: {
                    careType: careRequest.careType,
                    weeklyRate: {
                        gte: careRequest.budgetMin,
                        lte: careRequest.budgetMax,
                    },
                },
            },
        },
        include: {
            specializations: true,
            rates: true,
            reviews: true,
        },
    });

    // Score each carer
    const scoredCarers = carers.map((carer: any) => {
        let score = 0;

        // 1. LOCATION (40 points max) - closer is better
        const distance = calculateDistance(
            careRequest.family.lat?.toNumber() || 0,
            careRequest.family.lng?.toNumber() || 0,
            carer.lat?.toNumber() || 0,
            carer.lng?.toNumber() || 0
        );
        score += Math.max(0, 40 - distance); // Lose 1pt per km

        // 2. SPECIALIZATION MATCH (30 points max)
        const carerSpecs = carer.specializations.map((s: any) => s.specialization);
        const matchingSpecs = requiredSpecs.filter(spec => carerSpecs.includes(spec));
        const specScore = requiredSpecs.length > 0
            ? (matchingSpecs.length / requiredSpecs.length) * 30
            : 15; // Default if no specific requirements
        score += specScore;

        // 3. EXPERIENCE (15 points max)
        score += Math.min(carer.yearsExperience * 3, 15);

        // 4. RATING (15 points max)
        if (carer.reviews.length > 0) {
            const avgRating = carer.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / carer.reviews.length;
            score += (avgRating / 5) * 15;
        } else {
            score += 7.5; // Neutral score for no reviews
        }

        return {
            carer,
            score: Math.round(score),
            distance: Math.round(distance),
            matchingSpecs,
        };
    });

    // Sort by score (highest first)
    const sorted = scoredCarers.sort((a: any, b: any) => b.score - a.score);

    // Create match records for top 10
    const matches = await Promise.all(
        sorted.slice(0, 10).map(async ({ carer, score }: { carer: any, score: number }) => {
            // Create match
            const match = await prisma.match.create({
                data: {
                    careRequestId,
                    carerId: carer.id,
                    matchScore: score,
                    status: 'suggested',
                },
                include: {
                    carer: {
                        include: {
                            specializations: true,
                            rates: true,
                            reviews: true,
                        },
                    },
                },
            });

            // Create notification for carer
            await prisma.notification.create({
                data: {
                    userId: carer.userId,
                    type: 'match',
                    title: 'New Job Match',
                    content: `You have a new ${score}% match for a care request.`,
                    link: `/dashboard/carer/jobs/${careRequestId}`, // Assuming this route exists or will exist
                }
            });

            return match;
        })
    );

    return matches;
}

/**
 * Calculate distance between two points (Haversine formula)
 * Returns distance in kilometers
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Extract required specializations from medical conditions and mobility level
 */
export function extractRequiredSpecializations(
    medicalConditions: string | null,
    mobilityLevel: string
): string[] {
    const specs: string[] = [];
    const conditions = (medicalConditions || '').toLowerCase();

    // Check for specific conditions
    if (conditions.includes('dementia') || conditions.includes('alzheimer')) {
        specs.push('dementia');
    }
    if (conditions.includes('palliative') || conditions.includes('end of life')) {
        specs.push('palliative');
    }
    if (conditions.includes('autism')) {
        specs.push('autism');
    }
    if (conditions.includes('learning disabilit')) {
        specs.push('learning_disabilities');
    }
    if (conditions.includes('surgery') || conditions.includes('post-op')) {
        specs.push('post_surgery');
    }

    // Check mobility level
    if (mobilityLevel === 'full_support' || mobilityLevel === 'some_assistance') {
        specs.push('mobility_support');
    }

    // Default to elderly care if nothing specific
    if (specs.length === 0) {
        specs.push('elderly_care');
    }

    return specs;
}

/**
 * Determine pricing tier based on carer experience and specializations
 */
export function determineCarerTier(carer: any): 'standard' | 'enhanced' | 'premium' {
    const experience = carer.yearsExperience;
    const hasSpecialist = carer.specializations.some((s: any) =>
        ['dementia', 'palliative', 'post_surgery'].includes(s.specialization)
    );

    if (experience >= 5 || (experience >= 3 && hasSpecialist)) {
        return 'premium';
    } else if (experience >= 3 || hasSpecialist) {
        return 'enhanced';
    }
    return 'standard';
}
