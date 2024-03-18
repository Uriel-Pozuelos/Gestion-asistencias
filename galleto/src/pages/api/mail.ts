import supabase from '@/db/index';
import { jsonify } from '@/lib/jsonify';
import type { APIRoute } from 'astro';
import { createTransport } from 'nodemailer';

export const POST: APIRoute = async ({ request, redirect }) => {
	const transport = createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		auth: {
			user: 'urieher99@gmail.com',
			pass: 'jljasnvmrycxbgnc'
		}
	});

	let verificationCode = Math.floor(100000 + Math.random() * 900000);
	console.log(verificationCode);

	const { error } = await supabase.from('codigos').insert({
		codigo: String(verificationCode)
	});

	if (error) {
		return jsonify({
			message: 'Ha ocurrido un error al enviar el correo'
		});
	}

	const formData = await request.json();
	const mailOptions = {
		from: 'urieher99@gmail.com',
		to: formData.email as string,
		subject: 'Bienvenido a la plataforma',
		html: `<h1>Bienvenido a la plataforma</h1>
    <p>Tu codigo de verificacion es: ${verificationCode}</p>`
	};

	const info = await transport.sendMail(mailOptions);

	if (!info) {
		return jsonify({
			message: 'Ha ocurrido un error al enviar el correo'
		});
	}

	return jsonify({ message: 'Correo enviado' });
};
