'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, Mail } from 'lucide-react';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            setLoading(false);
            router.push('/dashboard');
        }, 1500);
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
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        required
                    />

                    <Button type="submit" isLoading={loading} className={styles.submitBtn}>
                        Sign In
                    </Button>
                </form>

                <div className={styles.footer}>
                    <Link href="#" className={styles.link}>Forgot password?</Link>
                    <span className={styles.divider}>•</span>
                    <Link href="#" className={styles.link}>Create account</Link>
                </div>
            </div>
        </div>
    );
}
