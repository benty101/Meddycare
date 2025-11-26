import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-auth';

/**
 * GET /api/inbox/clients
 * Get client/carer direct messages
 */
export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        const messages = await prisma.message.findMany({
            where: {
                recipientId: user.id,
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
