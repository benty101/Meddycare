import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * GET /api/applications
 * Get carer's job applications with optional status filter
 */
export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData || userData.role !== 'carer') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const carer = await prisma.carer.findUnique({
            where: { userId: userData.userId },
        });

        if (!carer) {
            return NextResponse.json({ error: 'Carer profile not found' }, { status: 404 });
        }

        // Get status filter from query params
        const url = new URL(req.url);
        const statusFilter = url.searchParams.get('status');

        // Build where clause
        const where: any = { carerId: carer.id };
        if (statusFilter && statusFilter !== 'all') {
            where.status = statusFilter;
        }

        // Get applications
        const applications = await prisma.carerApplication.findMany({
            where,
            include: {
                careRequest: {
                    include: {
                        recipient: {
                            select: {
                                firstName: true,
                                age: true,
                                medicalConditions: true,
                            },
                        },
                        family: {
                            select: {
                                postcode: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                appliedAt: 'desc',
            },
        });

        return NextResponse.json(applications);

    } catch (error) {
        console.error('Get applications error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST /api/applications
 * Apply to a care request
 */
export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData || userData.role !== 'carer') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const carer = await prisma.carer.findUnique({
            where: { userId: userData.userId },
        });

        if (!carer) {
            return NextResponse.json({ error: 'Carer profile not found' }, { status: 404 });
        }

        const { careRequestId } = await req.json();

        // Check if already applied
        const existing = await prisma.carerApplication.findFirst({
            where: {
                carerId: carer.id,
                careRequestId,
            },
        });

        if (existing) {
            return NextResponse.json({ error: 'Already applied to this request' }, { status: 400 });
        }

        // Create application
        const application = await prisma.carerApplication.create({
            data: {
                carerId: carer.id,
                careRequestId,
                status: 'applied',
            },
            include: {
                careRequest: {
                    include: {
                        recipient: true,
                        family: true,
                    },
                },
            },
        });

        return NextResponse.json(application);

    } catch (error) {
        console.error('Create application error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
