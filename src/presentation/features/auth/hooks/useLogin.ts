import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/infrastructure/lib/supabase';

export const useLogin = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            router.push('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message === 'Invalid login credentials'
                ? 'Invalid email or password. Do you have an account yet?'
                : (err.message || 'Failed to login'));
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        loading, error,
        handleLogin
    };
};
