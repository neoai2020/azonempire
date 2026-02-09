'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, Mail } from 'lucide-react';
import styles from './page.module.css';

import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundGlow} />

            <div className={`glass ${styles.card}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>AzonEmpire</h1>
                    <p className={styles.subtitle}>Welcome back, Emperor.</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className={styles.errorText}>{error}</p>}

                    <Button type="submit" isLoading={loading} className={styles.submitBtn}>
                        Sign In
                    </Button>
                </form>

                <div className={styles.footer}>
                    <Link href="#" className={styles.link}>Forgot password?</Link>
                    <span className={styles.divider}>•</span>
                    <Link href="/register" className={styles.link}>Create account</Link>
                </div>
            </div>
        </div>
    );
}
