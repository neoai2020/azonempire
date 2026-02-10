'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/presentation/components/ui/Button';
import { Input } from '@/src/presentation/components/ui/Input';
import { Lock, Mail } from 'lucide-react';
import { useLogin } from '@/src/presentation/features/auth/hooks/useLogin';
import styles from './page.module.css';

export default function LoginPage() {
    const { email, setEmail, password, setPassword, loading, error, handleLogin } = useLogin();

    return (
        <div className={styles.container}>
            <div className={styles.backgroundGlow} />
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Enter your credentials to access your account</p>
                </div>

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <Mail className={styles.icon} size={20} />
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.inputWithIcon}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <Lock className={styles.icon} size={20} />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.inputWithIcon}
                        />
                    </div>

                    <Button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>Don't have an account? <Link href="/register" className={styles.link}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
}
