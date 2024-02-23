import type { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
	'https://zxlmmgzvgshlknapirjc.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bG1tZ3p2Z3NobGtuYXBpcmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDU0MDIsImV4cCI6MjAyMzc4MTQwMn0.0ikVxvE22CpkqYN6qMmTdj_mi3Qb6o6EqL3hvaeVvGo'
);

export default supabase;
