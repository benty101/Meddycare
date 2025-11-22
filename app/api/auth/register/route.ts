import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createToken, generateVerificationToken, hashToken, setAuthCookie } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';
import { registerSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate request body
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.issues },
                { status: 400 }
            );
        }

        const { email, password, role, firstName, lastName, phone, postcode } = validation.data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Generate verification token
        const verificationToken = generateVerificationToken();
        const hashedToken = await hashToken(verificationToken);

        // Create user and profile in transaction
        const result = await prisma.$transaction(async (tx: any) => {
            // Create user
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role,
                    emailVerified: false, // Will be verified via email
                },
            });

            // Create role-specific profile
            if (role === 'family') {
                await tx.family.create({
                    data: {
                        userId: user.id,
                        firstName,
                        lastName,
                        phone,
                        postcode,
                    },
                });
            } else if (role === 'carer') {
                // Map experience string to integer if provided
                let yearsExp = body.yearsExperience || 0;
                if (typeof body.experience === 'string') {
                    if (body.experience === "1-3 years") yearsExp = 2;
                    else if (body.experience === "3-5 years") yearsExp = 4;
                    else if (body.experience === "5-10 years") yearsExp = 7;
                    else if (body.experience === "10+ years") yearsExp = 10;
                }

                const carer = await tx.carer.create({
                    data: {
                        userId: user.id,
                        firstName,
                        lastName,
                        phone,
                        postcode,
                        yearsExperience: yearsExp,
                        bio: body.bio || null,
                        status: 'pending', // Requires admin approval
                    },
                });

                // Create specializations if provided
                if (body.specializations && Array.isArray(body.specializations)) {
                    for (const spec of body.specializations) {
                        const s = spec.toLowerCase();
                        let specEnum = null;

                        if (s.includes('dementia')) specEnum = 'dementia';
                        else if (s.includes('palliative')) specEnum = 'palliative';
                        else if (s.includes('mobility')) specEnum = 'mobility_support';
                        else if (s.includes('autism')) specEnum = 'autism';
                        else if (s.includes('learning')) specEnum = 'learning_disabilities';
                        else if (s.includes('elderly')) specEnum = 'elderly_care';
                        else if (s.includes('post') && s.includes('surgery')) specEnum = 'post_surgery';
                        else if (s.includes('special') && s.includes('needs')) specEnum = 'special_needs';

                        if (specEnum) {
                            await tx.carerSpecialization.create({
                                data: {
                                    carerId: carer.id,
                                    specialization: specEnum as any,
                                }
                            });
                        }
                    }
                }
            }

            // Store verification token (you may want to create a separate table for this)
            // For now, we'll send it via email and verify directly
            // In production, store hashedToken with expiry in a VerificationToken table

            return user;
        });

        // Send verification email
        await sendVerificationEmail(
            email,
            firstName,
            verificationToken
        );

        // Create JWT token (user can log in but some features require verification)
        const token = await createToken(result.id, result.email, result.role);

        // Create response with auth cookie
        const response = NextResponse.json({
            success: true,
            message: 'Registration successful! Please check your email to verify your account.',
            user: {
                id: result.id,
                email: result.email,
                role: result.role,
                emailVerified: result.emailVerified,
            },
        }, { status: 201 });

        setAuthCookie(response, token);

        return response;

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}

