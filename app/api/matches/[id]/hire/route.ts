import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * POST /api/matches/[id]/hire
 * Confirm a match and create a care placement
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData || userData.role !== 'family') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: matchId } = await params;

        // Get the match and related data
        const match = await prisma.match.findUnique({
            where: { id: matchId },
            include: {
                careRequest: true,
                carer: {
                    include: {
                        rates: true
                    }
                }
            }
        });

        if (!match) {
            return NextResponse.json({ error: 'Match not found' }, { status: 404 });
        }

        // Verify family owns the request
        const family = await prisma.family.findUnique({
            where: { userId: userData.userId }
        });

        if (!family || match.careRequest.familyId !== family.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Transaction to update status and create placement
        const result = await prisma.$transaction(async (tx: any) => {
            // 1. Update Match Status
            await tx.match.update({
                where: { id: matchId },
                data: { status: 'confirmed' }
            });

            // 2. Update Care Request Status
            await tx.careRequest.update({
                where: { id: match.careRequestId },
                data: { status: 'matched' }
            });

            // 3. Create Care Placement
            // Determine rate based on care type
            const rate = match.carer.rates.find((r: any) => r.careType === match.careRequest.careType);
            const weeklyRate = rate?.weeklyRate || rate?.hourlyRate?.mul(40) || 0; // Fallback logic

            const placement = await tx.carePlacement.create({
                data: {
                    matchId: match.id,
                    familyId: family.id,
                    carerId: match.carerId,
                    recipientId: match.careRequest.recipientId,
                    startDate: match.careRequest.startDate || new Date(),
                    weeklyRate: weeklyRate,
                    status: 'active'
                }
            });

            // 4. Create Notification for Carer
            await tx.notification.create({
                data: {
                    userId: match.carer.userId,
                    type: 'application_update',
                    title: 'You have been hired!',
                    content: `Congratulations! You have been hired for the care request.`,
                    link: `/dashboard/carer/placements/${placement.id}`
                }
            });

            return placement;
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error('Hire carer error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
