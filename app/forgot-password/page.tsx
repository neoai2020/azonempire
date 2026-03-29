'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/src/presentation/components/ui/Button';
import { Input } from '@/src/presentation/components/ui/Input';
import { useForgotPassword } from '@/src/presentation/features/auth/hooks/useForgotPassword';
import styles from '../login/page.module.css';

export default function ForgotPasswordPage() {
    const { email, setEmail, loading, sent, error, handleReset } = useForgotPassword();

    if (sent) {
        return (
            <div className={styles.container}>
                <div className={styles.backgroundGlow} />
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Check Your Email</h1>
                        <p className={styles.subtitle}>
                            We sent a password reset link to <strong style={{ color: '#e4e4e7' }}>{email}</strong>.
                            Click the link in the email to reset your password.
                        </p>
                        <p className={styles.subtitle}>Don&apos;t see it? Check your spam folder.</p>
                    </div>
                    <Link href="/login" className={styles.link} style={{ textAlign: 'center' }}>
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.backgroundGlow} />
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Forgot Password</h1>
                    <p className={styles.subtitle}>Enter your email and we&apos;ll send you a reset link.</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleReset} className={styles.form}>
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

                    <Button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <Link href="/login" className={styles.link}>
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
