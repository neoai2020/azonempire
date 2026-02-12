'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function SecretAccessPage() {
    const params = useParams();
    const router = useRouter();
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

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                throw new Error('Server returned an invalid response. Please contact support.');
            }

            if (!response.ok) {
                throw new Error(data.error || 'Failed to unlock');
            }

            setMessage({ type: 'success', text: 'SUCCESS! UPGRADE ACTIVATED. REDIRECTING...' });

            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'VERIFICATION FAILED. TRY AGAIN.' });
        } finally {
            setLoading(false);
        }
    };

    const prettyName =
        (slug || 'Secret Access')
            .split('-')
            .filter(word => !['unlock', 'access', 'secret', 'key'].includes(word.toLowerCase()))
            .filter(word => !/^[0-9a-z]{6,7}$/.test(word))
            .map((word) => word.toUpperCase())
            .join(' ');

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#050505',
            backgroundImage: `
                radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.12) 0%, transparent 45%),
                radial-gradient(circle at 90% 90%, rgba(168, 85, 247, 0.12) 0%, transparent 45%),
                linear-gradient(to bottom, #0a0a0a, #050505)
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px',
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Hexagonal Abstract Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.04,
                pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: '150px'
            }} />

            <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 10 }}>
                {/* Logo Section */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                    <div style={{
                        fontSize: '34px',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(to bottom, #ffffff 0%, #38bdf8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.5))'
                    }}>
                        AzonEmpire
                    </div>
                </div>

                {/* Central Glass Card */}
                <div style={{
                    borderRadius: '28px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(15, 15, 15, 0.7)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    padding: '48px 32px',
                    boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.15), 0 30px 60px -12px rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                }}>
                    {/* Neon Rim Light Effect */}
                    <div style={{
                        position: 'absolute',
                        inset: -1,
                        borderRadius: '28px',
                        padding: '1px',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), transparent, transparent)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 900,
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: '#ffffff',
                            lineHeight: 1.2
                        }}>
                            Unlock the {prettyName || "Upgrade"} Upgrade
                        </h1>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 400 }}>
                            Enter your registered email to activate exclusive access.
                        </p>
                    </div>

                    {message && (
                        <div
                            style={{
                                marginBottom: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                borderRadius: '14px',
                                border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                padding: '16px',
                                fontSize: '0.85rem',
                                color: message.type === 'success' ? '#10b981' : '#fb7185',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}
                        >
                            <div style={{ flexShrink: 0 }}>
                                {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            </div>
                            <p>{message.text}</p>
                        </div>
                    )}

                    <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                style={{
                                    width: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '14px',
                                    padding: '22px 24px',
                                    fontSize: '1rem',
                                    color: '#ffffff',
                                    outline: 'none',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#6366f1';
                                    e.currentTarget.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.3), inset 0 2px 4px rgba(0,0,0,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)';
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                padding: '22px',
                                fontSize: '1.1rem',
                                fontWeight: 900,
                                color: '#ffffff',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: (loading || !email) ? 0.6 : 1,
                                boxShadow: '0 12px 24px -6px rgba(99, 102, 241, 0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em'
                            }}
                            onMouseOver={(e) => {
                                if (!loading && email) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 15px 30px -6px rgba(99, 102, 241, 0.7)';
                                }
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(99, 102, 241, 0.5)';
                            }}
                        >
                            {loading ? (
                                <Loader2 style={{ height: '24px', width: '24px', animation: 'spin 1s linear infinite' }} />
                            ) : (
                                "Unlock Now"
                            )}
                        </button>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '32px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <ShieldCheck size={14} style={{ color: '#6366f1' }} />
                                <span>Security</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <CheckCircle2 size={14} style={{ color: '#6366f1' }} />
                                <span>Instant Access</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Global Spin animation for Loader */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}
