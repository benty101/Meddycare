import { NextRequest, NextResponse } from 'next/server';
import { signOut } from '@/lib/supabase-auth';

export async function POST(req: NextRequest) {
    try {
        // Sign out from Supabase (clears server-side session)
        try {
            await signOut();
        } catch (error) {
            // Ignore Supabase signout errors - client will clear localStorage anyway
            console.log('Supabase signout error (non-critical):', error);
        }

        // Create response
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        });

        return response;

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
