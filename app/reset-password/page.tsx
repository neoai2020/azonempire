'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Button } from '@/src/presentation/components/ui/Button';
import { Input } from '@/src/presentation/components/ui/Input';
import { supabase } from '@/src/infrastructure/lib/supabase';
import styles from '../login/page.module.css';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const [ready, setReady] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            const urlParams = new URLSearchParams(window.location.search);

            const urlError = urlParams.get('error');
            if (urlError) {
                setError(urlError);
                setChecking(false);
                return;
            }

            const tokenHash = urlParams.get('token_hash');
            const type = urlParams.get('type');
            if (tokenHash && type === 'recovery') {
                try {
                    const { error: verifyError } = await supabase.auth.verifyOtp({
                        token_hash: tokenHash,
                        type: 'recovery',
                    });
                    if (verifyError) {
                        setError(verifyError.message);
                    } else {
                        setReady(true);
                    }
                } catch {
                    setError('Failed to verify reset link. Please request a new one.');
                }
                setChecking(false);
                return;
            }

            const code = urlParams.get('code');
            if (code) {
                try {
                    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
                    if (exchangeError) {
                        setError(exchangeError.message);
                    } else {
                        setReady(true);
                    }
                } catch {
                    setError('Failed to verify reset code. Please request a new link.');
                }
                setChecking(false);
                return;
            }

            const hash = window.location.hash.substring(1);
            const hashParams = new URLSearchParams(hash);
            const hashError = hashParams.get('error_description');
            if (hashError) {
                setError(hashError.replace(/\+/g, ' '));
                setChecking(false);
                return;
            }
            const accessToken = hashParams.get('access_token');
            const refreshToken = hashParams.get('refresh_token');
            if (accessToken && refreshToken) {
                try {
                    const { error: sessionError } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });
                    if (sessionError) {
                        setError(sessionError.message);
                    } else {
                        setReady(true);
                    }
                } catch {
                    setError('Failed to verify reset link. Please request a new one.');
                }
                setChecking(false);
                return;
            }

            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (session) {
                setReady(true);
            } else {
                setError('No active reset session. Please request a new password reset link.');
            }
            setChecking(false);
        };

        void init();
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error: updateError } = await supabase.auth.updateUser({ password });
            if (updateError) {
                setError(updateError.message);
            } else {
                setSuccess(true);
            }
        } catch {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div className={styles.container}>
                <div className={styles.backgroundGlow} />
                <div className={styles.card}>
                    <p className={styles.subtitle} style={{ textAlign: 'center', margin: 0 }}>
                        Verifying your reset link...
                    </p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className={styles.container}>
                <div className={styles.backgroundGlow} />
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Password Updated</h1>
                        <p className={styles.subtitle}>Your password has been changed successfully.</p>
                    </div>
                    <Link href="/login" className={styles.link} style={{ textAlign: 'center' }}>
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    if (!ready && error) {
        return (
            <div className={styles.container}>
                <div className={styles.backgroundGlow} />
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Reset Failed</h1>
                        <p className={styles.subtitle}>{error}</p>
                    </div>
                    <Link href="/forgot-password" className={styles.link} style={{ textAlign: 'center' }}>
                        Request New Link
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
                    <h1 className={styles.title}>Set New Password</h1>
                    <p className={styles.subtitle}>Choose a strong password for your account.</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <Lock className={styles.icon} size={20} />
                        <Input
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className={styles.inputWithIcon}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <Lock className={styles.icon} size={20} />
                        <Input
                            type="password"
                            placeholder="Confirm password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            className={styles.inputWithIcon}
                        />
                    </div>

                    <Button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className={styles.container}>
                    <div className={styles.backgroundGlow} />
                    <div className={styles.card}>
                        <p className={styles.subtitle} style={{ textAlign: 'center', margin: 0 }}>
                            Loading...
                        </p>
                    </div>
                </div>
            }
        >
            <ResetPasswordForm />
        </Suspense>
    );
}
