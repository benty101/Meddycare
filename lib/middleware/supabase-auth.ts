import { NextRequest } from 'next/server';
import { getUserFromToken } from '@/lib/supabase-auth';
import { prisma } from '@/lib/prisma';

export async function requireAuth(req: NextRequest, allowedRoles?: string[]) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
        throw new Error('No authorization token provided');
    }

    // Verify token with Supabase
    const supabaseUser = await getUserFromToken(token);

    if (!supabaseUser) {
        throw new Error('Invalid token');
    }

    // Get full user data from database
    const dbUser = await prisma.user.findUnique({
        where: { supabaseAuthId: supabaseUser.id },
        include: {
            family: true,
            carer: true,
        },
    });

    if (!dbUser) {
        throw new Error('User not found in database');
    }

    // Check role permissions
    if (allowedRoles && !allowedRoles.includes(dbUser.role)) {
        throw new Error('Insufficient permissions');
    }

    return {
        userId: dbUser.id,
        supabaseAuthId: supabaseUser.id,
        email: dbUser.email,
        role: dbUser.role,
        family: dbUser.family,
        carer: dbUser.carer,
    };
}
