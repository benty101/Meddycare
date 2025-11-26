import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-auth';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        const { userId: otherUserId } = await params;

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: user.id, recipientId: otherUserId },
                    { senderId: otherUserId, recipientId: user.id }
                ]
            },
            orderBy: {
                createdAt: 'asc'
            },
            include: {
                sender: {
                    include: {
                        family: { select: { firstName: true, lastName: true } },
                        carer: { select: { firstName: true, lastName: true, profilePhoto: true } }
                    }
                }
            }
        });

        return NextResponse.json(messages);

    } catch (error) {
        console.error('Get conversation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
