import { createClient } from "@supabase/supabase-js";

// const projectURL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseClient = async (supabaseAccessToken) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
        }
    );

    return supabase;
};