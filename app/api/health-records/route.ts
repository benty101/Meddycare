import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * GET /api/health-records?recipientId=...&type=...
 * Fetch health records for a recipient
 */
export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(req.url);
        const recipientId = url.searchParams.get('recipientId');
        const type = url.searchParams.get('type');

        if (!recipientId) {
            return NextResponse.json({ error: 'Recipient ID required' }, { status: 400 });
        }

        // Verify access
        // Family: check if recipient belongs to family
        // Carer: check if active placement with recipient
        let hasAccess = false;

        if (userData.role === 'family') {
            const family = await prisma.family.findUnique({
                where: { userId: userData.userId },
                include: { recipients: true }
            });
            if (family && family.recipients.some(r => r.id === recipientId)) {
                hasAccess = true;
            }
        } else if (userData.role === 'carer') {
            const carer = await prisma.carer.findUnique({
                where: { userId: userData.userId }
            });
            if (carer) {
                const placement = await prisma.carePlacement.findFirst({
                    where: {
                        carerId: carer.id,
                        recipientId: recipientId,
                        status: 'active'
                    }
                });
                if (placement) {
                    hasAccess = true;
                }
            }
        }

        if (!hasAccess) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Build where clause
        const where: any = { recipientId };
        if (type) {
            where.recordType = type;
        }

        const records = await prisma.healthRecord.findMany({
            where,
            orderBy: { recordedAt: 'desc' },
            take: 50 // Limit to last 50 records
        });

        return NextResponse.json(records);

    } catch (error) {
        console.error('Get health records error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST /api/health-records
 * Create a new health record
 */
export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { recipientId, recordType, data, recordedAt } = body;

        if (!recipientId || !recordType || !data) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify access (same as GET)
        let hasAccess = false;
        let recorderName = "Unknown";

        if (userData.role === 'family') {
            const family = await prisma.family.findUnique({
                where: { userId: userData.userId },
                include: { recipients: true }
            });
            if (family && family.recipients.some(r => r.id === recipientId)) {
                hasAccess = true;
                recorderName = `${family.firstName} ${family.lastName}`;
            }
        } else if (userData.role === 'carer') {
            const carer = await prisma.carer.findUnique({
                where: { userId: userData.userId }
            });
            if (carer) {
                const placement = await prisma.carePlacement.findFirst({
                    where: {
                        carerId: carer.id,
                        recipientId: recipientId,
                        status: 'active'
                    }
                });
                if (placement) {
                    hasAccess = true;
                    recorderName = `${carer.firstName} ${carer.lastName}`;
                }
            }
        }

        if (!hasAccess) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const record = await prisma.healthRecord.create({
            data: {
                recipientId,
                recordType,
                data,
                recordedAt: recordedAt ? new Date(recordedAt) : new Date(),
                recordedBy: recorderName
            }
        });

        return NextResponse.json(record);

    } catch (error) {
        console.error('Create health record error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
