import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * POST /api/inbox/messages
 * Send a message to another user
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
        const { recipientId, content, matchId } = body;

        if (!recipientId || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Fetch sender details
        const sender = await prisma.user.findUnique({
            where: { id: userData.userId },
            select: { email: true }
        });

        if (!sender) {
            return NextResponse.json({ error: 'Sender not found' }, { status: 404 });
        }

        // Create message
        const message = await prisma.message.create({
            data: {
                senderId: userData.userId,
                recipientId,
                content,
                matchId, // Optional, links message to a specific match context
                messageType: 'user_message',
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        family: {
                            select: { firstName: true, lastName: true }
                        },
                        carer: {
                            select: { firstName: true, lastName: true, profilePhoto: true }
                        }
                    }
                }
            }
        });

        // Create notification for recipient
        await prisma.notification.create({
            data: {
                userId: recipientId,
                type: 'message',
                title: 'New Message',
                content: `You have a new message from ${sender.email}`, // Ideally use name
                link: '/dashboard/family/inbox', // Or dynamic based on role
            }
        });

        return NextResponse.json(message);

    } catch (error) {
        console.error('Send message error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
