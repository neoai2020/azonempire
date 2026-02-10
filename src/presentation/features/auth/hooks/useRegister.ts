import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/infrastructure/lib/supabase';

export const useRegister = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (authError) throw authError;

            // Simple redirect for now, could show a "check email" message if email confirmation is enabled
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        fullName, setFullName,
        loading, error,
        handleRegister
    };
};
