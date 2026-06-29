const SUPABASE_URL = "https://eqyedayduqhkaqakclsa.supabase.co";

const SUPABASE_KEY = "sb_publishable_BP2QNs0PXfI7sWh9bp7DkQ_QyHD4dOf";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

window.supabaseClient = supabaseClient;