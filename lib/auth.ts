import { hash, compare } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function hashPassword(password: string): Promise<string> {
    return hash(password, 12);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return compare(password, hashedPassword);
}

export interface JWTPayload {
    userId: string;
    email: string;
    role: 'family' | 'carer' | 'admin';
}

export async function createToken(userId: string, email: string, role: string): Promise<string> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    return new SignJWT({ userId, email, role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
        .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return {
            userId: payload.userId as string,
            email: payload.email as string,
            role: payload.role as 'family' | 'carer' | 'admin',
        };
    } catch (error) {
        return null;
    }
}

export async function getUserFromToken(token: string | undefined): Promise<JWTPayload | null> {
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload) return null;

    return {
        userId: payload.userId as string,
        email: payload.email as string,
        role: payload.role as 'family' | 'carer' | 'admin',
    };
}

/**
 * Get the current user from the request
 */
export async function getCurrentUser(request: NextRequest): Promise<JWTPayload | null> {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
        return null;
    }

    return await verifyToken(token);
}

/**
 * Get the current user from cookies (for server components)
 */
export async function getCurrentUserFromCookies(): Promise<JWTPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
        return null;
    }

    return await verifyToken(token);
}

/**
 * Set auth cookie
 */
export function setAuthCookie(response: NextResponse, token: string) {
    response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

/**
 * Clear auth cookie
 */
export function clearAuthCookie(response: NextResponse) {
    response.cookies.delete('auth-token');
}

/**
 * Middleware to protect routes - requires authentication
 */
export async function requireAuth(request: NextRequest): Promise<{
    user: JWTPayload;
    response?: NextResponse;
} | { user: null; response: NextResponse }> {
    const user = await getCurrentUser(request);

    if (!user) {
        return {
            user: null,
            response: NextResponse.json(
                { error: 'Unauthorized. Please log in.' },
                { status: 401 }
            ),
        };
    }

    return { user };
}

/**
 * Middleware to protect routes - requires specific role
 */
export async function requireRole(
    request: NextRequest,
    allowedRoles: Array<'family' | 'carer' | 'admin'>
): Promise<{
    user: JWTPayload;
    response?: NextResponse;
} | { user: null; response: NextResponse }> {
    const authResult = await requireAuth(request);

    if (!authResult.user) {
        return authResult;
    }

    if (!allowedRoles.includes(authResult.user.role)) {
        return {
            user: null,
            response: NextResponse.json(
                { error: 'Forbidden. You do not have permission to access this resource.' },
                { status: 403 }
            ),
        };
    }

    return { user: authResult.user };
}

/**
 * Generate a random verification token
 */
export function generateVerificationToken(): string {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

/**
 * Hash a verification token for storage
 */
export async function hashToken(token: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

