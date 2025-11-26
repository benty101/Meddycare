import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/api-auth';

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        let placementId: string | undefined;

        if (user.role === 'carer') {
            const carer = await prisma.carer.findUnique({
                where: { userId: user.id }
            });
            if (!carer) return NextResponse.json({ error: 'Carer not found' }, { status: 404 });

            const placement = await prisma.carePlacement.findFirst({
                where: { carerId: carer.id, status: 'active' }
            });
            if (!placement) return NextResponse.json({ error: 'No active placement' }, { status: 404 });
            placementId = placement.id;
        } else if (user.role === 'family') {
            // Family logic if needed, but mostly for carer to log
            return NextResponse.json({ error: 'Family view not implemented yet' }, { status: 501 });
        }

        if (!placementId) return NextResponse.json({ error: 'Placement ID required' }, { status: 400 });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const log = await prisma.careLog.findFirst({
            where: {
                placementId,
                logDate: today
            }
        });

        return NextResponse.json(log || null);

    } catch (error) {
        console.error('Get daily log error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await requireRole(req, ['carer']);
        if (user instanceof NextResponse) return user; // Return error response

        const carer = await prisma.carer.findUnique({
            where: { userId: user.id }
        });
        if (!carer) return NextResponse.json({ error: 'Carer not found' }, { status: 404 });

        const placement = await prisma.carePlacement.findFirst({
            where: { carerId: carer.id, status: 'active' }
        });
        if (!placement) return NextResponse.json({ error: 'No active placement' }, { status: 404 });

        const body = await req.json();
        const { medicationsGiven, notes, mood, activities, meals } = body;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Upsert log
        const log = await prisma.careLog.findFirst({
            where: {
                placementId: placement.id,
                logDate: today
            }
        });

        if (log) {
            // Update existing
            const updatedLog = await prisma.careLog.update({
                where: { id: log.id },
                data: {
                    medicationsGiven: medicationsGiven || log.medicationsGiven,
                    notes: notes !== undefined ? notes : log.notes,
                    mood: mood || log.mood,
                    activities: activities || log.activities,
                    meals: meals || log.meals
                }
            });
            return NextResponse.json(updatedLog);
        } else {
            // Create new
            const newLog = await prisma.careLog.create({
                data: {
                    placementId: placement.id,
                    carerId: carer.id,
                    logDate: today,
                    medicationsGiven: medicationsGiven || [],
                    notes: notes || '',
                    mood: mood || 'good',
                    activities: activities || [],
                    meals: meals || []
                }
            });
            return NextResponse.json(newLog);
        }

    } catch (error) {
        console.error('Update daily log error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
