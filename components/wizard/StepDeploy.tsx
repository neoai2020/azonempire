'use client';

import React, { useEffect, useState } from 'react';
import { useWizard } from '@/lib/store/wizard-context';
import { Button } from '@/components/ui/Button';
import { CheckCircle, ExternalLink, Copy, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './WizardSteps.module.css';

export const StepDeploy = () => {
    const { data } = useWizard();
    const router = useRouter();
    const [deploying, setDeploying] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const persistProject = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) throw new Error('User not found');

                const { error: insertError } = await supabase
                    .from('projects')
                    .insert({
                        name: data.keyword,
                        status: 'Live',
                        views: 0,
                        clicks: 0,
                        user_id: user.id,
                        last_updated: new Date().toISOString()
                    });

                if (insertError) throw insertError;

                setDeploying(false);
            } catch (err: any) {
                console.error('Error persisting project:', err);
                setError(err.message);
                setDeploying(false);
            }
        };

        const timer = setTimeout(() => {
            persistProject();
        }, 2000);

        return () => clearTimeout(timer);
    }, [data, supabase]);

    if (deploying) {
        return (
            <div className={styles.stepContainer} style={{ alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <div className={styles.loader} style={{ width: '64px', height: '64px', borderColor: 'var(--success)', borderTopColor: 'transparent' }} />
                <h3 style={{ marginTop: '24px', fontSize: '1.5rem' }}>Deploying to Edge Network...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.stepContainer} style={{ alignItems: 'center', textAlign: 'center' }}>
                <div style={{ color: 'var(--danger)', marginBottom: '24px' }}>
                    <AlertCircle size={64} />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Deployment Failed</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        );
    }

    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    const liveUrl = `${baseUrl}/${data.keyword.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={styles.stepContainer} style={{ alignItems: 'center', textAlign: 'center' }}>
            <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(16, 185, 129, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                color: 'var(--success)'
            }}>
                <CheckCircle size={48} />
            </div>

            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '8px' }}>Asset Live!</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '40px' }}>
                Your review page has been successfully published and is ready to earn commissions.
            </p>

            <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                width: '100%',
                maxWidth: '500px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '32px'
            }}>
                <span style={{
                    color: 'var(--success)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                }}>
                    LIVE
                </span>
                <span style={{ flex: 1, textAlign: 'left', fontFamily: 'monospace', color: 'var(--text-dim)' }}>
                    {liveUrl}
                </span>
                <button style={{ color: 'var(--text-main)' }}>
                    <Copy size={16} />
                </button>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <Button onClick={() => window.open(liveUrl, '_blank')} variant="outline">
                    <ExternalLink size={18} /> View Live Page
                </Button>
                <Button onClick={() => router.push('/dashboard')}>
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
};
