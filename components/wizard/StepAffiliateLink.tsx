'use client';

import React, { useState } from 'react';
import { useWizard } from '@/lib/store/wizard-context';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LinkIcon } from 'lucide-react';
import styles from './WizardSteps.module.css';

export const StepAffiliateLink = () => {
    const { data, updateData, nextStep, prevStep } = useWizard();
    const [link, setLink] = useState(data.affiliateLink);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!link.includes('amazon')) {
            setError('Please paste a valid Amazon link.');
            return;
        }
        updateData({ affiliateLink: link });
        nextStep();
    };

    return (
        <div className={styles.stepContainer}>
            <div className={styles.header}>
                <h2>Monetize It</h2>
                <p>Paste your affiliate link for this product.</p>
            </div>

            <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
            }}>
                <img
                    src={data.selectedProduct?.image}
                    alt="Product"
                    style={{ width: '64px', height: '64px', objectFit: 'contain', background: 'white', borderRadius: '4px', padding: '4px' }}
                />
                <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {data.selectedProduct?.title}
                    </p>
                    <a
                        href={data.selectedProduct?.url}
                        target="_blank"
                        style={{ fontSize: '0.85rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        Open on Amazon to get link <LinkIcon size={12} />
                    </a>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Input
                    label="Affiliate Link"
                    placeholder="https://amzn.to/..."
                    value={link}
                    onChange={(e) => {
                        setLink(e.target.value);
                        setError('');
                    }}
                    error={error}
                />
                <Button onClick={handleSubmit} disabled={!link}>
                    Validate & Continue
                </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="ghost" onClick={prevStep}>Back</Button>
            </div>
        </div>
    );
};
