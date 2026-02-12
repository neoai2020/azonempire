'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Lock, Unlock, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DashboardSecretAccessPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('/api/upgrades/unlock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, secretSlug: slug }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to unlock');
            }

            setMessage({ type: 'success', text: 'Access granted! This upgrade is now attached to your account.' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Verification failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const prettyName =
        (slug || 'Secret Access')
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
                    Secret Unlock
                </p>
                <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
                    {prettyName}
                </h1>
                <p className="max-w-xl text-sm text-slate-400">
                    You&apos;ve discovered a hidden tier. Confirm your registered email to permanently unlock this upgrade on
                    your AzonEmpire account.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.9)]">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-emerald-400">
                        {message?.type === 'success' ? <Unlock size={22} /> : <Lock size={22} />}
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Account verification
                        </p>
                        <p className="text-sm text-slate-200">
                            Use the same email you used when creating your AzonEmpire login.
                        </p>
                    </div>
                </div>

                {message && (
                    <div
                        className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                            message.type === 'success'
                                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                                : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                        }`}
                    >
                        <div className="mt-0.5">
                            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        </div>
                        <p>{message.text}</p>
                    </div>
                )}

                <form onSubmit={handleUnlock} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                            Registered Email
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/60">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5 text-slate-500"
                            >
                                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                            </svg>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="flex-1 bg-transparent text-sm text-slate-50 outline-none placeholder:text-slate-500"
                            />
                        </div>
                        <p className="text-[11px] text-slate-500">
                            We&apos;ll match this email with your account, then attach this upgrade to your profile.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_40px_rgba(16,185,129,0.6)] transition hover:bg-emerald-400 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/40 border-t-slate-950" />
                                <span>Verifying access...</span>
                            </>
                        ) : (
                            <>
                                <span>Unlock this upgrade</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                        <ShieldCheck size={13} className="text-emerald-400" />
                        <span>Secure, one-time verification. Unlock is tied to your account, not this browser.</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

