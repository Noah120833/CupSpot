import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bseolqamcdzwfhqmbbck.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzZW9scWFtY2R6d2ZocW1iYmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjA3MDksImV4cCI6MjA5MDQzNjcwOX0.UX8qy8LYqQ90JL_MBEpvvnp7M06WdTKSugLO9hD22Dw'

const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase