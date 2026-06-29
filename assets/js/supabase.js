const SUPABASE_URL = "https://eqyedayduqhkaqakclsa.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxeWVkYXlkdXFoa2FxYWtjbHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NTYzNDgsImV4cCI6MjA5ODIzMjM0OH0.sRZJuTffjt4uiSr8PjrrGnNOun5Wy18inhQ4P1poTYA";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);