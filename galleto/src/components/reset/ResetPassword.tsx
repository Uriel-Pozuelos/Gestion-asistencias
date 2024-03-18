import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import adminAuthClient from '@/db/admin';
import supabase from '@/db';
import { useToast } from '@/components/ui/use-toast';
import { el } from 'date-fns/locale';

function ResetLogin() {
	const { toast } = useToast();
	const [data, setErrors] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setErrors((prev: any) => ({
			...prev,
			[name]: value
		}));
	};

	const [message, setMessage] = useState('');

	const confirmPasswords = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();

		const { password, confirmPassword } = data;
		console.log(data);
		console.log(password, confirmPassword);

		const passwordRegex =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
		if (
			!password.match(passwordRegex) ||
			!confirmPassword.match(passwordRegex)
		) {
			setMessage(
				'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número'
			);
			return;
		}

		//obtener el id del usuario por el correo
		const { data: user, error } =
			await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password
			});

		if (error) {
			toast({
				title: 'Error',
				description: 'Ha ocurrido un error al buscar el usuario.',
				variant: 'destructive'
			});
			return;
		}

		if (!user) {
			toast({
				title: 'Error',
				description: 'El usuario no existe.',
				variant: 'destructive'
			});
			return;
		}

		const { error: resetError, data: f } =
			await adminAuthClient.updateUserById(user.user.id, {
				password: data.confirmPassword
			});
		console.log(f);

		if (resetError) {
			toast({
				title: 'Error',
				description:
					'Ha ocurrido un error al restablecer la contraseña.',
				variant: 'destructive'
			});
			return;
		} else {
			window.location.href = '/';
		}
	};

	return (
		<>
			<form className="grid w-full gap-2">
				<div className="grid">
					<label>Correo</label>
					<Input
						type="text"
						name="email"
						className="bg-white"
						onChange={handleChange}
					/>
				</div>
				<div className="grid">
					<label>Antigua Contraseña</label>
					<Input
						type="text"
						name="password"
						className="bg-white"
						onChange={handleChange}
					/>
				</div>

				<div className="grid">
					<label>Nueva contraseña</label>
					<Input
						type="text"
						name="confirmPassword"
						className="bg-white"
						onChange={handleChange}
					/>
				</div>

				<div className="flex w-[40%] max-w-[40%] text-wrap">
					{message && (
						<div className="flex justify-center w-full">
							<span className="self-center text-red-500 w-[60%] max-w-[60%] overflow-wrap whitespace-wrap ">
								{message}
							</span>
						</div>
					)}
				</div>
				<div>
					<Button
						variant="secondary"
						size="lg"
						className="self-center my-5"
						onClick={confirmPasswords}>
						Restablecer Contraseña
					</Button>
				</div>
			</form>
		</>
	);
}

export default ResetLogin;
