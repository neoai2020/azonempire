import { useState } from 'react';
import { supabase } from '@/src/infrastructure/lib/supabase';

export const useForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
            if (resetError) {
                setError(resetError.message);
            } else {
                setSent(true);
            }
        } catch {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        loading,
        sent,
        error,
        handleReset,
    };
};
