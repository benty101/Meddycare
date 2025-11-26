import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/api-auth';

/**
 * GET /api/care-plans?placementId=...
 * Fetch care plan for a specific placement
 */
export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        const url = new URL(req.url);
        const placementId = url.searchParams.get('placementId');

        if (!placementId) {
            return NextResponse.json({ error: 'Placement ID required' }, { status: 400 });
        }

        // Verify access
        const placement = await prisma.carePlacement.findUnique({
            where: { id: placementId },
            include: {
                family: true,
                carer: true
            }
        });

        if (!placement) {
            return NextResponse.json({ error: 'Placement not found' }, { status: 404 });
        }

        // Check if user is part of this placement
        const isFamily = user.role === 'family' && placement.family.userId === user.id;
        const isCarer = user.role === 'carer' && placement.carer.userId === user.id;

        if (!isFamily && !isCarer) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const carePlan = await prisma.carePlan.findUnique({
            where: { placementId },
        });

        return NextResponse.json(carePlan || null);

    } catch (error) {
        console.error('Get care plan error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST /api/care-plans
 * Create or update a care plan
 */
export async function POST(req: NextRequest) {
    try {
        const user = await requireRole(req, ['family']);
        if (user instanceof NextResponse) return user; // Return error response

        const body = await req.json();
        const { placementId, careGoals, dailyRoutines, medications, dietaryRequirements, emergencyContacts } = body;

        if (!placementId) {
            return NextResponse.json({ error: 'Placement ID required' }, { status: 400 });
        }

        // Verify ownership
        const placement = await prisma.carePlacement.findUnique({
            where: { id: placementId },
            include: { family: true }
        });

        if (!placement || placement.family.userId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Upsert Care Plan
        const carePlan = await prisma.carePlan.upsert({
            where: { placementId },
            update: {
                careGoals,
                dailyRoutines,
                medications,
                dietaryRequirements,
                emergencyContacts,
                updatedAt: new Date()
            },
            create: {
                placementId,
                careGoals,
                dailyRoutines,
                medications,
                dietaryRequirements,
                emergencyContacts,
                createdBy: user.id
            }
        });

        return NextResponse.json(carePlan);

    } catch (error) {
        console.error('Save care plan error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
