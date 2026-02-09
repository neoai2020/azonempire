'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                }
            }
        });

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
        } else if (data?.session) {
            // If confirmation is disabled, we get a session immediately
            router.push('/dashboard');
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.container}>
                <div className={styles.backgroundGlow} />
                <div className={`glass ${styles.card}`}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Check your email</h1>
                        <p className={styles.subtitle}>We've sent a confirmation link to {email}.</p>
                    </div>
                    <Button onClick={() => router.push('/login')} className={styles.submitBtn}>
                        Back to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.backgroundGlow} />

            <div className={`glass ${styles.card}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Join AzonEmpire</h1>
                    <p className={styles.subtitle}>Start your journey to dominance.</p>
                </div>

                <form onSubmit={handleRegister} className={styles.form}>
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Emperor Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
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
                        Create Account
                    </Button>
                </form>

                <div className={styles.footer}>
                    <span>Already have an account?</span>
                    <Link href="/login" className={styles.link}>Sign In</Link>
                </div>
            </div>
        </div>
    );
}
