import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import adminAuthClient from '@/db/admin';
import { tr } from 'date-fns/locale';
import supabase from '@/db';
import { set } from 'date-fns';

function FormLogin() {
	const [errors, setErrors] = useState({
		usuario: '',
		password: '',
		code: ''
	});
	const [data, setData] = useState({
		usuario: '',
		password: '',
		code: ''
	});

	const [message, setMessage] = useState('');
	const [validationCode, setValidationCode] = useState('');
	const [isWaiting, setIsWaiting] = useState(false);

	const [resetPassword, setResetPassword] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setData((prev: any) => ({
			...prev,
			[name]: value
		}));
	};

	const handleCode = async () => {
		const code = data.code;
		//validar que el codigo sea el mismo que el de la base de datos

		let { data: codigos, error } = await supabase
			.from('codigos')
			.select('*')
			.eq('codigo', code);

		if (error) {
			setMessage('Ha ocurrido un error al buscar el codigo');
			return;
		}

		if (codigos?.length === 0) {
			setMessage('El codigo no es valido');
			return;
		}

		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({
				email: data.usuario,
				password: data.password
			}),
			redirect: 'follow'
		});
		if (response.redirected) {
			navigate(response.url);
			return;
		}

		const d = await response.json();
		if (d.errorMessages) {
			setErrors(d.errorMessages);

			setTimeout(() => {
				setErrors({
					usuario: '',
					password: '',
					code: ''
				});
			}, 3000);

			return;
		}
		if (d.message) {
			setMessage(d.message);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		setResetPassword(true);

		const res = await fetch('/api/mail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: formData.get('usuario') })
		}).then(res => res.json());

		if (res.message) {
			setSuccess(true);
		}
	};

	return (
		<>
			{!resetPassword && (
				<form onSubmit={handleSubmit} className="w-full">
					<div className="my-5 text-center">
						<label>Correo</label>
						<Input
							type="text"
							name="usuario"
							className="bg-white"
							value={data.usuario}
							onChange={handleChange}
						/>
					</div>
					<div>
						{errors.usuario && (
							<p className="text-red-500 text-sm">{errors.usuario}</p>
						)}
					</div>
					<div className="my-5 text-center">
						<label>Contraseña</label>
						<Input
							value={data.password}
							onChange={handleChange}
							type="password"
							name="password"
							className="bg-white"
						/>
					</div>
					<div>
						{errors.password && (
							<p className="text-red-500 text-sm">
								{errors.password}
							</p>
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
				</form>
			)}
			{resetPassword && (
				<div className="grid gap-4">
					<div className="my-5 text-center">
						<label>Codigo de verificacion</label>
						<Input
							type="text"
							name="code"
							value={data.code}
							onChange={handleChange}
							className="bg-white"
							placeholder="Codigo"
						/>
					</div>
					{success && (
						<div className="bg-green-100 text-green-600 px-2 rounded">
							Correo enviado con éxito, revisa tu bandeja de entrada
							para continuar
						</div>
					)}
					{message && (
						<p className="text-red-500 text-sm">{message}</p>
					)}

					<Button
						variant="secondary"
						size="lg"
						className="self-center my-5"
						type="button"
						onClick={handleCode}>
						Aceptar
					</Button>

					<Button
						variant="secondary"
						size="lg"
						className="self-center my-5"
						onClick={() => setResetPassword(false)}>
						Regresar a Inicio de Sesión
					</Button>
				</div>
			)}
			<a
				className="cursor-pointer hover:underline flex justify-center w-full"
				href={resetPassword ? '/login' : '/reset-password'}>
				{resetPassword ? 'Login' : 'Restablecer contraseña'}
			</a>
		</>
	);
}

export default FormLogin;
