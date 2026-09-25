import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Supabase Project
const SUPABASE_URL = "https://pvhlnnrbnjzigltwjzry.supabase.co";
const SUPABASE_KEY = "sb_publishable_AVkK6k_o9mJccFP-ya8eDg_uOYQNJ54";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("SmartOverlay: Supabase connected");
