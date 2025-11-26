import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-auth';

/**
 * GET /api/inbox/notifications
 * Get notification messages
 */
export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        const notifications = await prisma.notification.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(notifications);

    } catch (error) {
        console.error('Get notifications error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
