import { z, ZodError } from 'zod';
import type { APIRoute } from 'astro';
import supabase from '@/db';

const schema = z.object({
	usuario: z.string().min(3, {
		message: 'El usuario debe tener al menos 3 caracteres'
	}),
	password: z.string().min(3, {
		message: 'La contraseña debe tener al menos 3 caracteres'
	})
});

function validateSafe({
	usuario,
	password
}: {
	usuario: string;
	password: string;
}) {
	try {
		schema.parse({ usuario, password });
		return true;
	} catch (error) {
		const validationErrors = (error as ZodError).errors;
		const errorMessages: Record<string, string> = {};

		for (const validationError of validationErrors) {
			const path = validationError.path.join('.');
			errorMessages[path] = validationError.message;
		}

		return {
			errorMessages: errorMessages
		};
	}
}

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const username = formData.get('usuario');
	const password = formData.get('password');

	if (!username || !password) {
		return new Response(
			JSON.stringify({
				message: 'Usuario o contraseña incorrectos'
			}),
			{
				status: 401,
				headers: {
					'content-type': 'application/json;charset=UTF-8'
				}
			}
		);
	}

	const valid = validateSafe({
		usuario: username as string,
		password: password as string
	});
	
	if (valid !== true) {
		return new Response(JSON.stringify(valid), {
			status: 400,
			headers: {
				'content-type': 'application/json;charset=UTF-8'
			}
		});
	}

	const { error } = await supabase.auth.signInWithOtp({
		email: username as string,
		options: { 
			emailRedirectTo: '/home',
			shouldCreateUser: false
		}
	});

	// let { error } = await supabase.auth.signInWithPassword({
	// 	email: username as string,
	// 	password: password as string
	// });

	if (error) {
		return new Response(
			JSON.stringify({
				message: 'Usuario o contraseña incorrectos'
			}),
			{
				status: 401,
				headers: {
					'content-type': 'application/json;charset=UTF-8'
				}
			}
		);
	}

	return redirect('/home', 307);
};
