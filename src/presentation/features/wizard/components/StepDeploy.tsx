'use client';

import React, { useEffect, useState } from 'react';
import { useWizard } from '@/src/presentation/features/wizard/context/wizard-context';
import { Button } from '@/src/presentation/components/ui/Button';
import { CheckCircle, ExternalLink, Copy, Check, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/infrastructure/lib/supabase';
import styles from './WizardSteps.module.css';

export const StepDeploy = () => {
    const { data } = useWizard();
    const router = useRouter();
    const [deploying, setDeploying] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [baseUrl, setBaseUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [finalSlug, setFinalSlug] = useState('');

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    const hasSubmitted = React.useRef(false);

    useEffect(() => {
        const persistProject = async () => {
            if (hasSubmitted.current) return;
            hasSubmitted.current = true;

            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) throw new Error('User not found');

                // Generate a unique slug to avoid collisions
                const uniqueId = Math.random().toString(36).substring(2, 7);
                const slug = `${data.keyword.replace(/\s+/g, '-').toLowerCase()}-${uniqueId}`;
                setFinalSlug(slug);

                const { error: insertError } = await supabase
                    .from('projects')
                    .insert({
                        name: data.keyword,
                        slug: slug,
                        status: 'Live',
                        views: 0,
                        clicks: 0,
                        user_id: user.id,
                        last_updated: new Date().toISOString(),
                        review_title: data.generatedContent?.title || `Review: ${data.selectedProduct?.title}`,
                        review_verdict: data.generatedContent?.verdict || '',
                        review_features: data.generatedContent?.features || [],
                        review_description: data.generatedContent?.description || '',
                        review_article_body: data.generatedContent?.articleBody || '',
                        product_image: data.selectedProduct?.image || '',
                        affiliate_link: data.affiliateLink || ''
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
    }, [data.keyword, data.generatedContent, data.selectedProduct, data.affiliateLink]);

    const liveUrl = `${baseUrl}/${finalSlug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(liveUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                <span style={{ flex: 1, textAlign: 'left', fontFamily: 'monospace', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {liveUrl}
                </span>
                <button
                    onClick={handleCopy}
                    className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                    style={{
                        color: copied ? 'var(--success)' : 'var(--text-main)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.875rem'
                    }}
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied && <span>Copied!</span>}
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
