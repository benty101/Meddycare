import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Auth callback handler for email verification and OAuth
 * This route handles the redirect after email confirmation
 */
export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') ?? '/';

    if (code) {
        const cookieStore = await cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.set({ name, value: '', ...options });
                    },
                },
            }
        );

        try {
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
                console.error('Error exchanging code for session:', error);
                return NextResponse.redirect(new URL('/auth/error?error=' + encodeURIComponent(error.message), requestUrl.origin));
            }
        } catch (error) {
            console.error('Error exchanging code for session:', error);
            return NextResponse.redirect(new URL('/auth/error', requestUrl.origin));
        }
    }

    // Redirect to the desired page (dashboard based on role, or home)
    return NextResponse.redirect(new URL(next, requestUrl.origin));
}
