import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate request body
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.issues },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                family: true,
                carer: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Get user profile data
        let profile = null;
        if (user.role === 'family' && user.family) {
            profile = {
                firstName: user.family.firstName,
                lastName: user.family.lastName,
                phone: user.family.phone,
            };
        } else if (user.role === 'carer' && user.carer) {
            profile = {
                firstName: user.carer.firstName,
                lastName: user.carer.lastName,
                phone: user.carer.phone,
                status: user.carer.status,
            };
        }

        // Create JWT token
        const token = await createToken(user.id, user.email, user.role);

        // Create response with auth cookie
        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified,
                profile,
            },
        });

        setAuthCookie(response, token);

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}
