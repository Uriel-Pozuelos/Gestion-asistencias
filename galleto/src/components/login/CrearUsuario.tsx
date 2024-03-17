import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { z } from 'zod';
import adminAuthClient from '@/db/admin';

function CrearUsuario() {
	const { toast } = useToast();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		role: 'authenticated' // Puedes establecer un valor predeterminado aquí si lo deseas
	});
	const isSecurePassword = (password: string) => {
		// Validar que la contraseña tenga al menos 8 caracteres
		// y al menos un número, una letra mayúscula y una minúscula y un caracter especial entre !@#$%^&*()
		const passwordSchema = z
			.string()
			.min(8)
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/);
		const result = passwordSchema.safeParse(password);
		return result.success;
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const isPasswordSecure = isSecurePassword(formData.password);
		if (!isPasswordSecure) {
			toast({
				title: 'Error',
				description:
					'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un caracter especial entre !@#$%^&*()',
				variant: 'destructive'
			});
			return;
		} else {
			const { data: profileData, error: profileError } =
				await adminAuthClient.createUser({
					email: formData.email,
					password: formData.password,
					role: formData.role
				});

			const { data: email, error: e } =
				await adminAuthClient.inviteUserByEmail(formData.email);
			if (e) {
				toast({
					title: 'Error',
					description: 'Ha ocurrido un error al crear el usuario.',
					variant: 'destructive'
				});
			}

			if (profileError) {
				toast({
					title: 'Error',
					description: 'Ha ocurrido un error al crear el usuario.',
					variant: 'destructive'
				});
			} else {
				toast({
					title: 'Usuario creado',
					description: `El usuario ${formData.email} ha sido creado. Se ha enviado un correo electrónico para que complete su registro.`
				});
			}
		}
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col w-1/2">
			<label>
				Correo electrónico
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
					placeholder="Email"
					className="w-full p-2 mb-2 text-black"
				/>
			</label>
			<label>
				Crea una contraseña
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					placeholder="Password"
					className="w-full p-2 mb-2 text-black"
				/>
			</label>
			<label>
				Tipo de usuario
				<select
					className="w-full p-2 mb-2 text-black"
					name="role"
					value={formData.role}
					onChange={handleInputChange}>
					<option value="authenticated">Administrador</option>
					<option value="vendedor">Vendedor</option>
					<option value="contador">Contador</option>
				</select>
			</label>

			<button
				className="bg-secondary text-black p-2 w-full"
				id="crearUsuario"
				type="submit">
				Crear usuario
			</button>
		</form>
	);
}

export default CrearUsuario;
