import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        // Get current user from cookie
        const user = await getCurrentUser(req);

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get user with profile
        const userData = await prisma.user.findUnique({
            where: { id: user.userId },
            include: {
                family: true,
                carer: {
                    include: {
                        specializations: true,
                        rates: true,
                    },
                },
            },
        });

        if (!userData) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: userData.id,
            email: userData.email,
            role: userData.role,
            emailVerified: userData.emailVerified,
            profile: userData.role === 'family' ? userData.family : userData.carer,
        });

    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

