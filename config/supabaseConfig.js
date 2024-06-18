import { createClient } from "@supabase/supabase-js";
const supabase_url = "https://rpmzykoxqnbozgdoqbpc.supabase.co";
const service_role_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTkyNzk3MSwiZXhwIjoyMDE3NTAzOTcxfQ.chnzqTCllX3uazNbArr9cmhCIIUUq2YUddGwJ3E7L5E";

const supabase = createClient(supabase_url, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Access auth admin api
const adminAuthClient = supabase.auth.admin;

export default supabase;
