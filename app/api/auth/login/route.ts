import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/supabase-auth';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.issues }, { status: 400 });
        }

        const { email, password } = body;

        const { session, user } = await signIn(email, password);

        if (!session || !user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Get user role from database
        let dbUser = await prisma.user.findUnique({
            where: { supabaseAuthId: user.id },
            select: { role: true, id: true },
        });

        if (!dbUser) {
            // Fallback for migration: try finding by email and update supabaseAuthId
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                dbUser = await prisma.user.update({
                    where: { id: existingUser.id },
                    data: { supabaseAuthId: user.id },
                    select: { role: true, id: true }
                });
            } else {
                return NextResponse.json({ error: 'User record not found' }, { status: 404 });
            }
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: dbUser.role,
            },
            token: session.access_token,  // Add token field for client compatibility
            session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
            },
        });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 401 }
        );
    }
}
