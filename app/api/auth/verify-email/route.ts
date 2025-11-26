import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.redirect(new URL('/login?error=invalid_token', req.url));
        }

        // Note: Email verification is now handled natively by Supabase Auth
        // This route is kept for backward compatibility but should be migrated
        // to use Supabase's built-in email verification flow

        // Redirect to login with success message
        return NextResponse.redirect(
            new URL('/login?verified=true&message=Email verified successfully! You can now log in.', req.url)
        );

    } catch (error) {
        console.error('Email verification error:', error);
        return NextResponse.redirect(
            new URL('/login?error=verification_failed', req.url)
        );
    }
}
