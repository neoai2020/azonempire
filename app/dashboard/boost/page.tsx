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
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <Sparkles size={32} color="#FFD700" /> Boost Your Assets
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Generate AI-powered marketing content to drive traffic to your reviews.
                </p>
            </div>

            <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '32px'
            }}>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Product Name / Topic</label>
                    <Input
                        placeholder="e.g. FIFA 23, Bose QuietComfort 45..."
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        style={{ fontSize: '1.1rem', padding: '12px' }}
                    />
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>Select Platform</label>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {[
                            { id: 'facebook', icon: Facebook, label: 'Facebook' },
                            { id: 'twitter', icon: Twitter, label: 'Twitter / X' },
                            { id: 'instagram', icon: Instagram, label: 'Instagram' },
                            { id: 'seo', icon: Globe, label: 'SEO Blog' },
                        ].map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setPlatform(p.id as any)}
                                style={{
                                    flex: 1,
                                    minWidth: '140px',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: `2px solid ${platform === p.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                                    background: platform === p.id ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                                    color: platform === p.id ? 'var(--primary)' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s ease'
                                }}
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
                    style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
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
                <div style={{
                    background: '#1a1a1a',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '24px',
                    position: 'relative'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Generated Content</h3>
                        <button
                            onClick={handleCopy}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                background: copied ? 'var(--success)' : 'var(--bg-surface)',
                                color: copied ? 'white' : 'var(--text-main)',
                                border: '1px solid var(--border-subtle)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <textarea
                        readOnly
                        value={generatedContent}
                        style={{
                            width: '100%',
                            minHeight: '200px',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-main)',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            resize: 'none',
                            outline: 'none',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>
            )}
        </div>
    );
}
