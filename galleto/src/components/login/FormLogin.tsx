import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';

function FormLogin() {
	const [errors, setErrors] = useState({
		usuario: '',
		password: ''
	});
	const [message, setMessage] = useState('');

	const [resetPassword, setResetPassword] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const response = await fetch('/api/login', {
			method: 'POST',
			body: formData,
			redirect: 'follow'
		});
		if (response.redirected) {
			navigate(response.url);
			return;
		}

		const data = await response.json();
		if (data.errorMessages) {
			setErrors(data.errorMessages);

			setTimeout(() => {
				setErrors({
					usuario: '',
					password: ''
				});
			}, 3000);

			return;
		}
		if (data.message) {
			setMessage(data.message);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	};

	const sendResetPassword = async () => {
		
	};



	return <>
			{!resetPassword && 
			<form onSubmit={handleSubmit} className="w-full">
				<div className="my-5 text-center">
					<label>Correo</label>
					<Input type="text" name="usuario" className="bg-white" />
				</div>
				<div>
					{errors.usuario && (
						<p className="text-red-500 text-sm">{errors.usuario}</p>
					)}
				</div>
				<div className="my-5 text-center">
					<label>Contraseña</label>
					<Input
						type="password"
						name="password"
						className="bg-white"
					/>
				</div>
				<div>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password}</p>
					)}
					{message && (
						<p className="text-red-500 text-sm">{message}</p>
					)}
				</div>
				<div className="flex justify-center w-full">
					<Button
						variant="secondary"
						size="lg"
						type="submit"
						className="self-center my-5">
						Ingresar
					</Button>
				</div>
			</form>}
			{resetPassword && <div className="grid gap-4">
				<div className="my-5 text-center">
					<label>Correo</label>
					<Input type="text" name="usuario" className="bg-white"  placeholder='Email de inicio de sesión'/>
				</div>
				{success && <div className='bg-green-100 text-green-600 px-2 rounded'>
					Correo enviado con éxito, revisa tu bandeja de entrada para restablecer tu contraseña
				</div>}
				<Button
					variant="secondary"
					size="lg"
					className="self-center my-5"
					onClick={sendResetPassword}>
					Enviar correo de recuperación
				</Button>
			</div>}
			<span className='cursor-pointer hover:underline flex justify-center w-full' onClick={() => setResetPassword(!resetPassword)}>
				{resetPassword ? 'Login' : 'Restablecer contraseña'}
			</span>
			
	</>
}

export default FormLogin;
