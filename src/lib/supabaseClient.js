'use client';

import { createClient } from '@supabase/supabase-js';

// These values come from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Detect current environment
const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Define redirect URL based on environment
const redirectTo = isLocalhost
  ? 'http://localhost:3000/auth/v1/callback'
  : 'https://micheleunderwater.com/auth/v1/callback';

// Initialize client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Optional helper: call when you start a login flow
export const getAuthOptions = () => ({
  redirectTo,
});
