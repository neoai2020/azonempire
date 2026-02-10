'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/src/presentation/components/ui/Button';
import { Input } from '@/src/presentation/components/ui/Input';
import { generateText } from '@/src/infrastructure/api/ai';
import { Check, Copy, Loader2, Sparkles, Facebook, Twitter, Instagram, Globe, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

const LOADING_MESSAGES = [
    "Generating Magic...",
    "Crafting the perfect hook...",
    "Analyzing top trends...",
    "Polishing your content...",
    "Almost there..."
];

export default function BoostPage() {
    const [productName, setProductName] = useState('');
    const [platform, setPlatform] = useState<'facebook' | 'twitter' | 'instagram' | 'seo'>('facebook');
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (loading) {
            let i = 0;
            interval = setInterval(() => {
                i = (i + 1) % LOADING_MESSAGES.length;
                setLoadingText(LOADING_MESSAGES[i]);
            }, 2000);
        } else {
            setLoadingText(LOADING_MESSAGES[0]);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleGenerate = async () => {
        if (!productName) return;

        setLoading(true);
        setGeneratedContent('');
        setError('');

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
        } catch (error: any) {
            console.error('Boost Generation Error:', error);
            setError(error.message || 'Sorry, something went wrong. Please try again.');
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
                        disabled={loading}
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
                                disabled={loading}
                                className={`${styles.platformButton} ${platform === p.id ? styles.active : ''} ${loading ? styles.disabled : ''}`}
                            >
                                <p.icon size={24} />
                                <span style={{ fontWeight: 600 }}>{p.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-4 border border-red-200">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <Button
                    onClick={handleGenerate}
                    disabled={!productName || loading}
                    className={styles.generateButton}
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" style={{ marginRight: '8px' }} />
                            {loadingText}
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
