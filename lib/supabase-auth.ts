import { supabase, supabaseAdmin } from './supabase';

/**
 * Sign up a new user
 */
export async function signUp(
  email: string,
  password: string,
  metadata: {
    firstName: string;
    lastName: string;
    role: 'family' | 'carer';
    phone: string;
    postcode: string;
  }
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata, // Stored in auth.users.raw_user_meta_data
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in existing user
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get current session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });
  if (error) throw error;
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
}

/**
 * Server-side: Get user from access token
 */
export async function getUserFromToken(token: string) {
  if (!supabaseAdmin) {
    throw new Error('Supabase Admin client not initialized. Check SUPABASE_SERVICE_ROLE_KEY.');
  }
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error) throw error;
  return user;
}
