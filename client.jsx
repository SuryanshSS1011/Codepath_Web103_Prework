import { createClient } from "@supabase/supabase-js";

const URL = "https://jyxvdzofgwhoeyaimnmb.supabase.co";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eHZkem9mZ3dob2V5YWltbm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0NTg5MTcsImV4cCI6MjAzODAzNDkxN30.wtoSKggGyjWnGTkvWLM_7oDL6Pejg-vT7AKl69rXO2U";

export const supabase = createClient(URL, API_KEY);