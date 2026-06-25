import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Runtime telemetry protection
  if (!url || !anonKey) {
    console.error("CRITICAL LINK FAULT: Client environment variables are undefined inside this scope.");
  }

  return createSupabaseClient(
    url || '',
    anonKey || ''
  );
};