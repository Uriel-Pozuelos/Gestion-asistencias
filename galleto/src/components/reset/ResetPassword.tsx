import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';

function ResetLogin() {
	const [data, setErrors] = useState({
		password: '',
		confirmPassword: ''
	});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setErrors(( prev: any) => ({
            ...prev,
            [name]: value
        }));
    }

    const [message, setMessage] = useState('');

    const confirmPasswords = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const { password, confirmPassword } = data;
        console.log(data);
        console.log(password, confirmPassword);

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!password.match(passwordRegex) || !confirmPassword.match(passwordRegex)){
            setMessage('La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número');
            // setTimeout(() => {
            //     setMessage('');
            // }, );
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }
    };

	return <>
			<form  className="grid w-full gap-2">
                <div className="grid">
                    <label>Nueva Contraseña</label>
                    <Input 
                    type='text'
                    name='password'
                    className='bg-white'
                    onChange={handleChange}
                    />
                </div>
                

                <div className="grid">
                    <label>Confirma tu Contraseña</label>
                    <Input 
                    type='text'
                    name='confirmPassword'
                    className='bg-white'
                    onChange={handleChange}
                    />
                </div>
                
                <div className="flex w-[40%] max-w-[40%] text-wrap">
                {message && (
                        <div className="flex justify-center w-full">
                            <span className="self-center text-red-500 w-[60%] max-w-[60%] overflow-wrap whitespace-wrap ">{message}</span>
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
}

export default ResetLogin;