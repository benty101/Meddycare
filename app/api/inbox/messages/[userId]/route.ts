import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const otherUserId = params.userId;

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userData.userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userData.userId }
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
