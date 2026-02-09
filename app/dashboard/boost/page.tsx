'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { generateText } from '@/lib/api/ai';
import { Check, Copy, Loader2, Sparkles, Facebook, Twitter, Instagram, Globe } from 'lucide-react';
import styles from './page.module.css'; // We'll need to create this CSS file or use inline styles for simplicity

export default function BoostPage() {
    const [productName, setProductName] = useState('');
    const [platform, setPlatform] = useState<'facebook' | 'twitter' | 'instagram' | 'seo'>('facebook');
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!productName) return;

        setLoading(true);
        setGeneratedContent('');

        let prompt = '';
        switch (platform) {
            case 'facebook':
                prompt = `Write an engaging Facebook post for the product "${productName}". Use emojis, ask a question to drive engagement, and include a call to action.`;
                break;
            case 'twitter':
                prompt = `Write a punchy Twitter thread (max 3 tweets) for "${productName}". Use hashtags, be concise, and create FOMO.`;
                break;
            case 'instagram':
                prompt = `Write an Instagram caption for "${productName}". Focus on lifestyle, visual appeal, and include 15 popular relevant hashtags.`;
                break;
            case 'seo':
                prompt = `Write a Meta Title, Meta Description, and a short 100-word blog intro for a review of "${productName}". Include high-traffic keywords.`;
                break;
        }

        try {
            const text = await generateText(prompt);
            setGeneratedContent(text);
        } catch (error) {
            console.error('Boost Generation Error:', error);
            setGeneratedContent('Sorry, something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h1 className={styles.title}>
                    <Sparkles size={32} color="#FFD700" /> Boost Your Assets
                </h1>
                <p className={styles.subtitle}>
                    Generate AI-powered marketing content to drive traffic to your reviews.
                </p>
            </div>

            <div className={styles.card}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Product Name / Topic</label>
                    <Input
                        placeholder="e.g. FIFA 23, Bose QuietComfort 45..."
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Select Platform</label>
                    <div className={styles.platformGrid}>
                        {[
                            { id: 'facebook', icon: Facebook, label: 'Facebook' },
                            { id: 'twitter', icon: Twitter, label: 'Twitter / X' },
                            { id: 'instagram', icon: Instagram, label: 'Instagram' },
                            { id: 'seo', icon: Globe, label: 'SEO Blog' },
                        ].map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setPlatform(p.id as any)}
                                className={`${styles.platformButton} ${platform === p.id ? styles.active : ''}`}
                            >
                                <p.icon size={24} />
                                <span style={{ fontWeight: 600 }}>{p.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={!productName || loading}
                    className={styles.generateButton}
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" style={{ marginRight: '8px' }} />
                            Generating Magic...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} style={{ marginRight: '8px' }} />
                            Generate Content
                        </>
                    )}
                </Button>
            </div>

            {generatedContent && (
                <div className={styles.resultContainer}>
                    <div className={styles.resultHeader}>
                        <h3 className={styles.resultTitle}>Generated Content</h3>
                        <button
                            onClick={handleCopy}
                            className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <textarea
                        readOnly
                        value={generatedContent}
                        className={styles.textarea}
                    />
                </div>
            )}
        </div>
    );
}
