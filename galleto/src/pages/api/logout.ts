import supabase from '@/db';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		return new Response(
			JSON.stringify({
				message: 'Error al cerrar sesión'
			}),
			{
				status: 500,
				headers: {
					'content-type': 'application/json;charset=UTF-8'
				}
			}
		);
	}
	return new Response(null, {
		status: 200,
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		}
	});
};
