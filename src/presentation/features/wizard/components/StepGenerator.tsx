'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWizard } from '@/src/presentation/features/wizard/context/wizard-context';
import { Button } from '@/src/presentation/components/ui/Button';
import { Check, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import styles from './WizardSteps.module.css';

export const StepGenerator = () => {
    const { data, nextStep, prevStep, updateData } = useWizard();
    const [generating, setGenerating] = useState(true);
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

    const generateAIContent = async () => {
        setGenerating(true);
        try {
            const prompt = `Generate a professional Amazon product review for: "${data.selectedProduct?.title}". 
            Target Keyword: "${data.keyword}". 
            Tone: "${data.tone}". 
            
            Return the response as a JSON object with strictly these keys:
            "title": (A catchy, SEO-optimized review title),
            "verdict": (A powerful, 2-3 sentence Quick Verdict that sells the product),
            "features": (An array of 4 unique, benefit-driven key features as strings),
            "description": (A persuasive introductory paragraph about why this product is a must-buy).
            
            IMPORTANT: Return ONLY the raw JSON object, no markdown, no code blocks, no extra text.`;

            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            const result = await response.json();
            console.log('AI API Response:', result);

            if (!response.ok) {
                throw new Error(result.error || result.details || 'API request failed');
            }

            let contentStr = result.result || '';
            // Clean up AI response - remove markdown code blocks if present
            contentStr = contentStr.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

            // Validate before parsing - must start with { and not be empty
            if (!contentStr || !contentStr.startsWith('{')) {
                console.error('Invalid content string:', contentStr);
                throw new Error('AI returned invalid response format');
            }

            const content = JSON.parse(contentStr);
            updateData({ generatedContent: content });
        } catch (error: any) {
            console.error('AI generation error:', error);
            // Show alert for rate limit or specific errors
            if (error.message?.includes('Rate limit') || error.message?.includes('429')) {
                alert('You are generating too fast! Please wait a moment.');
            }

            // Use fallback content if AI fails
            updateData({
                generatedContent: {
                    title: `Why the ${data.selectedProduct?.title?.substring(0, 40)}... is the Best Choice in 2026`,
                    verdict: `If you are looking for top-tier performance and reliability, this is the one to beat. With ${data.selectedProduct?.rating} stars from over ${data.selectedProduct?.reviews} users, it's clearly a market leader.`,
                    features: data.selectedProduct?.features || ["Amazing Build Quality", "Top-tier Performance", "User-friendly Design", "Great Value for Money"],
                    description: "This product has quickly become one of the most popular choices in its category, and for good reason. Combining premium build quality with exceptional performance, it delivers an experience that rivals products twice its price."
                }
            });
        } finally {
            setGenerating(false);
        }
    };

    useEffect(() => {
        // Auto-generate on first load
        generateAIContent();
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

    // Use AI content if available, otherwise fallback to product data
    const title = data.generatedContent?.title || `Why the ${data.selectedProduct?.title?.substring(0, 40)}... is the Best Choice in 2026`;
    const verdict = data.generatedContent?.verdict || `If you are looking for top-tier performance and reliability, this is the one to beat. With ${data.selectedProduct?.rating} stars from over ${data.selectedProduct?.reviews} users, it's clearly a market leader.`;
    const features = data.generatedContent?.features || data.selectedProduct?.features || ["Amazing Build Quality"];
    const description = data.generatedContent?.description || "";

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

            {/* Browser/Device Frame */}
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
                {/* Page Content */}
                <div style={{ height: '100%', overflowY: 'auto', color: 'black', fontFamily: 'sans-serif', direction: 'ltr' }}>
                    <div style={{ background: '#232f3e', padding: '16px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold' }}>BestReviews</span>
                        <span>Menu</span>
                    </div>

                    <div style={{ padding: '24px' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>
                            {title}
                        </h1>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', fontSize: '0.85rem', color: '#555' }}>
                            <span>By Editor</span> • <span>Updated Today</span>
                        </div>

                        <div style={{ position: 'relative', width: '100%', height: '300px', marginBottom: '24px' }}>
                            <Image
                                src={data.selectedProduct?.image || ''}
                                alt="Product"
                                fill
                                style={{ objectFit: 'contain', borderRadius: '8px' }}
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                        </div>

                        {description && (
                            <p style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                                {description}
                            </p>
                        )}

                        <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '8px', color: '#d32f2f' }}>
                                Quick Verdict
                            </div>
                            <p style={{ lineHeight: 1.6 }}>
                                {verdict}
                            </p>
                        </div>

                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>Key Features</h2>
                        <ul style={{ paddingLeft: '20px', marginBottom: '24px', lineHeight: 1.6 }}>
                            {features.map((f, i) => (
                                <li key={i} style={{ marginBottom: '8px' }}>{f}</li>
                            ))}
                        </ul>

                        <a
                            href={data.affiliateLink || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
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
                <Button variant="outline" onClick={generateAIContent}>
                    <RefreshCw size={16} /> Regenerate Copy
                </Button>
            </div>
        </div>
    );
};
