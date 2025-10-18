// src/lib/supabaseClient.ts
//
import { createClient } from "@supabase/supabase-js";

// Use the public (anon) key on the client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a client that can be safely used in the browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
