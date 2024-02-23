import supabase from '@/db';

const email = 'urieher99@gmail.com';

let { data, error } = await supabase.auth.resetPasswordForEmail(
	email
);

if (error) {
	console.error('Error al enviar el correo:', error);
}

console.log('Correo enviado:', data);
