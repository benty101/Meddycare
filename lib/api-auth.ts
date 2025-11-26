import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/supabase-auth';

export interface AuthUser {
    id: string;
    email: string;
    role: 'family' | 'carer' | 'admin';
    supabaseAuthId: string;
}

/**
 * Get authenticated user from request
 * Returns null if not authenticated
 */
export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return null;
        }

        const supabaseUser = await getUserFromToken(token);

        if (!supabaseUser) {
            return null;
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { supabaseAuthId: supabaseUser.id },
            select: {
                id: true,
                email: true,
                role: true,
                supabaseAuthId: true,
            },
        });

        if (!user) {
            return null;
        }

        return user as AuthUser;
    } catch (error) {
        console.error('Auth error:', error);
        return null;
    }
}

/**
 * Require authentication - returns 401 if not authenticated
 */
export async function requireAuth(req: NextRequest): Promise<AuthUser | NextResponse> {
    const user = await getAuthUser(req);

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return user;
}

/**
 * Require specific role - returns 401 if not authenticated, 403 if wrong role
 */
export async function requireRole(
    req: NextRequest,
    allowedRoles: Array<'family' | 'carer' | 'admin'>
): Promise<AuthUser | NextResponse> {
    const user = await getAuthUser(req);

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!allowedRoles.includes(user.role)) {
        return NextResponse.json(
            { error: 'Forbidden. You do not have permission to access this resource.' },
            { status: 403 }
        );
    }

    return user;
}
