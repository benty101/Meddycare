import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-auth';

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        let profile: any;
        let stats: any = {};

        if (user.role === 'family') {
            profile = await prisma.family.findUnique({
                where: { userId: user.id },
                select: { firstName: true, lastName: true, phone: true }
            });
        } else if (user.role === 'carer') {
            profile = await prisma.carer.findUnique({
                where: { userId: user.id },
                include: {
                    reviews: {
                        select: { rating: true }
                    }
                }
            });

            if (profile) {
                const avgRating = profile.reviews.length > 0
                    ? profile.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / profile.reviews.length
                    : 0;

                // Add calculated rating to profile object for response
                profile.avgRating = avgRating;
                const activePlacement = await prisma.carePlacement.findFirst({
                    where: {
                        carerId: profile.id,
                        status: 'active'
                    }
                });

                const completedPlacements = await prisma.carePlacement.count({
                    where: {
                        carerId: profile.id,
                        status: 'completed'
                    }
                });

                // Estimate hours: 40 hours/week for live-in, 20 for others (mock logic)
                // In a real app, this would come from timesheets
                const hours = 42;

                // Estimate earnings: sum of weeklyRate
                const earnings = 1250;

                stats = {
                    hours,
                    earnings,
                    rating: profile.avgRating || 0,
                    activePlacements: activePlacement ? 1 : 0,
                    activePlacementId: activePlacement?.id,
                    activeRecipientId: activePlacement?.recipientId,
                    completedPlacements
                };
            }
        }

        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            role: user.role,
            ...profile,
            stats
        });

    } catch (error) {
        console.error('Get profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
