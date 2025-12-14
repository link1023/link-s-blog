import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jpptqdokndtpylbfasla.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcHRxZG9rbmR0cHlsYmZhc2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MjM5NDgsImV4cCI6MjA4MTI5OTk0OH0.qUL6vlnaNQaE7s4WHc1cZfbw_5Ss21LIKxVLjkpXwvs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
