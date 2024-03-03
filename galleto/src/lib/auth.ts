import supabase from '@/db';

export async function isAuth() {
	const {
		data: { user }
	} = await supabase.auth.getUser();

	console.log(user);

	return !!user;
}
