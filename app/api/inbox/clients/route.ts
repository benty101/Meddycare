import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * GET /api/inbox/clients
 * Get client/carer direct messages
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
                messageType: 'user_message',
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        family: {
                            select: {
                                firstName: true,
                                lastName: true,
                            },
                        },
                        carer: {
                            select: {
                                firstName: true,
                                lastName: true,
                                profilePhoto: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(messages);

    } catch (error) {
        console.error('Get client messages error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
