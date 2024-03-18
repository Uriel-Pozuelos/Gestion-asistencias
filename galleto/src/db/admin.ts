import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://zxlmmgzvgshlknapirjc.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bG1tZ3p2Z3NobGtuYXBpcmpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwODIwNTQwMiwiZXhwIjoyMDIzNzgxNDAyfQ.pGYauKKPm_OslwiyOM5nuYWWNX4HWUjPgdm6yQkFAdY',
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	}
);

// Access auth admin api
const adminAuthClient = supabase.auth.admin;

export default adminAuthClient;
