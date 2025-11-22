import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * GET /api/inbox/platform
 * Get platform messages (from MeddyCare system)
 */
export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const messages = await prisma.message.findMany({
            where: {
                recipientId: userData.userId,
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
