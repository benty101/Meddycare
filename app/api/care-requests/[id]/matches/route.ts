import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/care-requests/[id]/matches
 * Get matches for a specific care request
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: careRequestId } = await params;

        const matches = await prisma.match.findMany({
            where: { careRequestId },
            include: {
                carer: {
                    include: {
                        specializations: true,
                        rates: true,
                        reviews: {
                            select: {
                                rating: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                matchScore: 'desc',
            },
        });

        // Calculate average ratings
        const matchesWithRatings = matches.map((match: any) => {
            const avgRating = match.carer.reviews.length > 0
                ? match.carer.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / match.carer.reviews.length
                : null;

            return {
                ...match,
                carer: {
                    ...match.carer,
                    avgRating,
                    reviewCount: match.carer.reviews.length,
                },
            };
        });

        return NextResponse.json(matchesWithRatings);

    } catch (error) {
        console.error('Get matches error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
