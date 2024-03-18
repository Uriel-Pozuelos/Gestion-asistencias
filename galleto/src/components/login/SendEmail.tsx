import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';

export const SendEmail = () => {
    const [email, setEmail] = useState('');

    const handleSendEmail = async () => {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            body: new URLSearchParams({ email }),
            redirect: 'follow'
        });
        if (response.redirected) {
            navigate(response.url);
            return;
        }
        const data = await response.json();
        if (data.errorMessages) {
            console.log(data.errorMessages);
            return;
        }
        if (data.message) {
            console.log(data.message);
        }
    };

return (
    <div>
        <Input
        type="email"
        placeholder="Email de usuario de inicio de sesión"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSendEmail}>Send Email</Button>
    </div> 
);
};
