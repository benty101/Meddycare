import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let profile: any;
        let stats: any = {};

        if (userData.role === 'family') {
            profile = await prisma.family.findUnique({
                where: { userId: userData.userId },
                select: { firstName: true, lastName: true, phone: true }
            });
        } else if (userData.role === 'carer') {
            profile = await prisma.carer.findUnique({
                where: { userId: userData.userId },
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
            ...userData,
            ...profile,
            stats
        });

    } catch (error) {
        console.error('Get profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
