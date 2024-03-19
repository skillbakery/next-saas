import { createClient } from "@supabase/supabase-js";

console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("NEXT_PUBLIC_SUPABASE_KEY:", process.env.NEXT_PUBLIC_SUPABASE_KEY);

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  export const getServiceSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );