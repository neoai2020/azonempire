'use client';

import React, { useState, useEffect } from 'react';
import { useWizard } from '@/lib/store/wizard-context';
import { Button } from '@/components/ui/Button';
import { Check, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import styles from './WizardSteps.module.css';

export const StepGenerator = () => {
    const { data, nextStep, prevStep } = useWizard();
    const [generating, setGenerating] = useState(true);
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

    useEffect(() => {
        // Simulate generation time
        const timer = setTimeout(() => {
            setGenerating(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (generating) {
        return (
            <div className={styles.stepContainer} style={{ alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <div className={styles.loader} style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
                <h3 style={{ marginTop: '24px', fontSize: '1.25rem' }}>Constructing your asset...</h3>
                <p style={{ color: 'var(--text-muted)' }}>Writing copy · Optimizing SEO · Designing layout</p>
            </div>
        );
    }

    return (
        <div className={styles.stepContainer} style={{ maxWidth: '1000px' }}>
            <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ textAlign: 'left' }}>
                    <h2>Review your Asset</h2>
                    <p>Ready to deploy?</p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ background: 'var(--bg-surface)', padding: '4px', borderRadius: '8px', display: 'flex', border: '1px solid var(--border-subtle)' }}>
                        <button
                            onClick={() => setDevice('desktop')}
                            style={{ padding: '8px', borderRadius: '6px', background: device === 'desktop' ? 'var(--bg-surface-hover)' : 'transparent', color: device === 'desktop' ? 'var(--text-main)' : 'var(--text-muted)' }}
                        >
                            <Monitor size={20} />
                        </button>
                        <button
                            onClick={() => setDevice('mobile')}
                            style={{ padding: '8px', borderRadius: '6px', background: device === 'mobile' ? 'var(--bg-surface-hover)' : 'transparent', color: device === 'mobile' ? 'var(--text-main)' : 'var(--text-muted)' }}
                        >
                            <Smartphone size={20} />
                        </button>
                    </div>
                    <Button onClick={nextStep} style={{ background: 'var(--success)' }}>
                        Deploy Now
                    </Button>
                </div>
            </div>

            {/* Mock Browser/Device Frame */}
            <div style={{
                width: device === 'desktop' ? '100%' : '375px',
                height: '600px',
                margin: '0 auto',
                background: 'white',
                borderRadius: device === 'desktop' ? '8px' : '32px',
                border: '8px solid #111',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.3s ease',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                {/* Mock Page Content */}
                <div style={{ height: '100%', overflowY: 'auto', color: 'black', fontFamily: 'sans-serif' }}>
                    <div style={{ background: '#232f3e', padding: '16px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold' }}>BestReviews</span>
                        <span>Menu</span>
                    </div>

                    <div style={{ padding: '24px' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>
                            Why the {data.selectedProduct?.title.substring(0, 40)}... is the Best Choice in 2026
                        </h1>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', fontSize: '0.85rem', color: '#555' }}>
                            <span>By Editor</span> • <span>Updated Today</span>
                        </div>

                        <img
                            src={data.selectedProduct?.image}
                            alt="Product"
                            style={{ width: '100%', borderRadius: '8px', marginBottom: '24px', maxHeight: '300px', objectFit: 'contain' }}
                        />

                        <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '8px', color: '#d32f2f' }}>
                                Quick Verdict
                            </div>
                            <p style={{ lineHeight: 1.6 }}>
                                If you are looking for top-tier performance and reliability, this is the one to beat.
                                With {data.selectedProduct?.rating} stars from over {data.selectedProduct?.reviews} users,
                                it's clearly a market leader.
                            </p>
                        </div>

                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>Key Features</h2>
                        <ul style={{ paddingLeft: '20px', marginBottom: '24px', lineHeight: 1.6 }}>
                            {data.selectedProduct?.features?.map((f, i) => (
                                <li key={i} style={{ marginBottom: '8px' }}>{f}</li>
                            )) || <li>Amazing Build Quality</li>}
                        </ul>

                        <a
                            href="#" // This would be the affiliate link in real app
                            style={{
                                display: 'block',
                                background: '#ff9900',
                                color: 'black',
                                textAlign: 'center',
                                padding: '16px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                        >
                            Check Price on Amazon
                        </a>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '16px' }}>
                <Button variant="ghost" onClick={prevStep}>Back to Edit</Button>
                <Button variant="outline"><RefreshCw size={16} /> Regenerate Copy</Button>
            </div>
        </div>
    );
};
