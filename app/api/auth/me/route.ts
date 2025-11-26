import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-auth';

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (user instanceof NextResponse) return user; // Return error response

        // Get user with profile
        const userData = await prisma.user.findUnique({
            where: { id: user.id },
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

