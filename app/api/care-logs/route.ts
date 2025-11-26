import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/api-auth';

/**
 * GET /api/care-logs
 * Fetch care logs for the logged-in user
 */
export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        let logs;

        if (user.role === 'family') {
            // Get family ID
            const family = await prisma.family.findUnique({
                where: { userId: user.id }
            });

            if (!family) {
                return NextResponse.json({ error: 'Family profile not found' }, { status: 404 });
            }

            // Fetch logs for all placements associated with this family
            logs = await prisma.careLog.findMany({
                where: {
                    placement: {
                        familyId: family.id
                    }
                },
                include: {
                    carer: {
                        select: { firstName: true, lastName: true }
                    }
                },
                orderBy: { logDate: 'desc' },
                take: 20 // Limit to recent logs
            });

        } else if (user.role === 'carer') {
            // Get carer ID
            const carer = await prisma.carer.findUnique({
                where: { userId: user.id }
            });

            if (!carer) {
                return NextResponse.json({ error: 'Carer profile not found' }, { status: 404 });
            }

            // Fetch logs created by this carer
            logs = await prisma.careLog.findMany({
                where: { carerId: carer.id },
                orderBy: { logDate: 'desc' },
                take: 20
            });
        } else {
            return NextResponse.json({ error: 'Invalid role' }, { status: 403 });
        }

        return NextResponse.json(logs);

    } catch (error) {
        console.error('Get care logs error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST /api/care-logs
 * Create a new care log (Carer only)
 */
export async function POST(req: NextRequest) {
    try {
        const user = await requireRole(req, ['carer']);
        if (user instanceof NextResponse) return user; // Return error response

        const body = await req.json();
        const { placementId, activities, meals, medicationsGiven, mood, notes } = body;

        if (!placementId || !mood) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get carer ID
        const carer = await prisma.carer.findUnique({
            where: { userId: user.id }
        });

        if (!carer) {
            return NextResponse.json({ error: 'Carer profile not found' }, { status: 404 });
        }

        // Verify placement belongs to carer
        const placement = await prisma.carePlacement.findUnique({
            where: { id: placementId }
        });

        if (!placement || placement.carerId !== carer.id) {
            return NextResponse.json({ error: 'Invalid placement' }, { status: 403 });
        }

        // Create log
        const log = await prisma.careLog.create({
            data: {
                placementId,
                carerId: carer.id,
                logDate: new Date(), // Defaults to now
                activities: activities || [],
                meals: meals || [],
                medicationsGiven: medicationsGiven || [],
                mood,
                notes
            }
        });

        // Notify family
        await prisma.notification.create({
            data: {
                userId: (await prisma.family.findUnique({ where: { id: placement.familyId }, select: { userId: true } }))?.userId!,
                type: 'care_log',
                title: 'New Care Log',
                content: `${carer.firstName} added a care log for today.`,
                link: `/dashboard/family/logs/${log.id}`
            }
        });

        return NextResponse.json(log);

    } catch (error) {
        console.error('Create care log error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
