import { NextRequest, NextResponse } from 'next/server';
import { signUp } from '@/lib/supabase-auth';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate body
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.issues }, { status: 400 });
        }

        const { email, password, role, firstName, lastName, phone, postcode } = body;

        // Check if user already exists in Prisma (to avoid Supabase call if possible)
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Sign up with Supabase Auth
        const { user } = await signUp(email, password, {
            firstName,
            lastName,
            role,
            phone,
            postcode,
        });

        if (!user || !user.id) {
            return NextResponse.json(
                { error: 'Failed to create user in Supabase' },
                { status: 500 }
            );
        }

        // Create User and Profile in Prisma
        await prisma.$transaction(async (tx) => {
            // Create User
            const newUser = await tx.user.create({
                data: {
                    email,
                    supabaseAuthId: user.id,
                    role,
                    emailVerified: false,
                    // passwordHash is optional now
                }
            });

            if (role === 'family') {
                await tx.family.create({
                    data: {
                        userId: newUser.id,
                        firstName,
                        lastName,
                        phone,
                        postcode,
                    },
                });
            } else if (role === 'carer') {
                await tx.carer.create({
                    data: {
                        userId: newUser.id,
                        firstName,
                        lastName,
                        phone,
                        postcode,
                        yearsExperience: 0,
                        status: 'pending',
                    },
                });
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Registration successful! Please check your email to verify your account.',
            user: {
                id: user.id,
                email: user.email,
                role,
            },
        }, { status: 201 });

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
