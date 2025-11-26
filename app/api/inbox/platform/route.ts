import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-auth';

/**
 * GET /api/inbox/platform
 * Get platform messages (from MeddyCare system)
 */
export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        const messages = await prisma.message.findMany({
            where: {
                recipientId: user.id,
                messageType: 'platform_message',
            },
            include: {
                sender: {
                    select: {
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(messages);

    } catch (error) {
        console.error('Get platform messages error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
