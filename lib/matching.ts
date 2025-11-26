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

    // Score each carer with enhanced algorithm
    const scoredCarers = carers.map((carer: any) => {
        let score = 0;
        const weights = {
            location: 35,
            specialization: 30,
            experience: 15,
            rating: 15,
            availability: 5,
        };

        // 1. LOCATION (35 points max) - closer is better with diminishing returns
        const distance = calculateDistance(
            careRequest.family.lat?.toNumber() || 0,
            careRequest.family.lng?.toNumber() || 0,
            carer.lat?.toNumber() || 0,
            carer.lng?.toNumber() || 0
        );
        // Use logarithmic scale for distance scoring
        const locationScore = distance === 0
            ? weights.location
            : Math.max(0, weights.location * (1 - Math.log10(distance + 1) / 2));
        score += locationScore;

        // 2. SPECIALIZATION MATCH (30 points max) - weighted by importance
        const carerSpecs = carer.specializations.map((s: any) => s.specialization);
        const matchingSpecs = requiredSpecs.filter(spec => carerSpecs.includes(spec));

        // Perfect match bonus
        const specScore = requiredSpecs.length > 0
            ? (matchingSpecs.length / requiredSpecs.length) * weights.specialization
            : weights.specialization * 0.5; // Half score if no specific requirements

        // Bonus for critical specializations (dementia, palliative)
        const hasCriticalSpec = matchingSpecs.some(spec =>
            ['dementia', 'palliative'].includes(spec)
        );
        score += specScore + (hasCriticalSpec ? 5 : 0);

        // 3. EXPERIENCE (15 points max) - with diminishing returns
        const experienceScore = Math.min(
            weights.experience,
            weights.experience * (1 - Math.exp(-carer.yearsExperience / 5))
        );
        score += experienceScore;

        // 4. RATING (15 points max) - weighted by number of reviews
        if (carer.reviews.length > 0) {
            const avgRating = carer.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / carer.reviews.length;
            const reviewConfidence = Math.min(1, carer.reviews.length / 10); // More reviews = higher confidence
            score += (avgRating / 5) * weights.rating * (0.7 + 0.3 * reviewConfidence);
        } else {
            score += weights.rating * 0.5; // Neutral score for no reviews
        }

        // 5. AVAILABILITY (5 points max) - check if schedule type matches
        const scheduleMatch = careRequest.scheduleType === 'live_in' ||
                            careRequest.scheduleType === 'visiting';
        score += scheduleMatch ? weights.availability : 0;

        // BONUS: Recent positive reviews (up to 3 bonus points)
        const recentReviews = carer.reviews.filter((r: any) => {
            const reviewDate = new Date(r.createdAt);
            const monthsAgo = (Date.now() - reviewDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
            return monthsAgo <= 6 && r.rating >= 4;
        });
        score += Math.min(3, recentReviews.length * 0.5);

        return {
            carer,
            score: Math.round(score * 10) / 10, // Round to 1 decimal
            distance: Math.round(distance),
            matchingSpecs,
            breakdown: {
                location: Math.round(locationScore),
                specialization: Math.round(specScore),
                experience: Math.round(experienceScore),
                rating: Math.round((carer.reviews.length > 0 ? (carer.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / carer.reviews.length / 5) * weights.rating : weights.rating * 0.5)),
            },
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
