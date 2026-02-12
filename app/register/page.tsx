'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/presentation/components/ui/Button';
import { Input } from '@/src/presentation/components/ui/Input';
import { User, Mail, Lock } from 'lucide-react';
import { useRegister } from '@/src/presentation/features/auth/hooks/useRegister';
import styles from './page.module.css';

export default function RegisterPage() {
    const { email, setEmail, password, setPassword, fullName, setFullName, loading, error, handleRegister } = useRegister();

    return (
        <div className={styles.container}>
            <div className={styles.backgroundGlow} />
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Get started with AzonEmpire today</p>
                </div>

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <User className={styles.icon} size={20} />
                        <Input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className={styles.inputWithIcon}
                        />
                    </div>

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
                        {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>Already have an account? <Link href="/login" className={styles.link}>Sign in</Link></p>
                </div>
            </div>
        </div>
    );
}
