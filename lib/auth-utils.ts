import { createServerClient } from './supabase';
import { prisma } from './prisma';
import { cookies } from 'next/headers';
import type { User } from '@supabase/supabase-js';

/**
 * Get the current authenticated user from server-side
 * Use this in Server Components, Server Actions, and API Routes
 */
export async function getCurrentUser() {
    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user;
}

/**
 * Get the current user with their database profile
 * Returns both Supabase auth user and Prisma User record
 */
export async function getCurrentUserWithProfile() {
    const authUser = await getCurrentUser();

    if (!authUser) {
        return null;
    }

    const dbUser = await prisma.user.findUnique({
        where: { supabaseAuthId: authUser.id },
        include: {
            family: true,
            carer: true,
        },
    });

    return {
        authUser,
        dbUser,
    };
}

/**
 * Check if current user has a specific role
 */
export async function hasRole(role: 'family' | 'carer' | 'admin'): Promise<boolean> {
    const user = await getCurrentUser();
    if (!user) return false;

    const userRole = user.user_metadata?.role;
    return userRole === role;
}

/**
 * Require authentication - throws if not authenticated
 * Use this in Server Actions or API routes
 */
export async function requireAuth(): Promise<User> {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}

/**
 * Require specific role - throws if not authenticated or wrong role
 */
export async function requireRole(role: 'family' | 'carer' | 'admin'): Promise<User> {
    const user = await requireAuth();
    const userRole = user.user_metadata?.role;

    if (userRole !== role) {
        throw new Error('Forbidden: Insufficient permissions');
    }

    return user;
}

/**
 * Get user's role from their profile
 */
export async function getUserRole(): Promise<'family' | 'carer' | 'admin' | null> {
    const user = await getCurrentUser();
    if (!user) return null;

    return user.user_metadata?.role ?? null;
}
