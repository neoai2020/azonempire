'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWizard } from '@/src/presentation/features/wizard/context/wizard-context';
import { LocalContentGenerator } from '@/src/infrastructure/services/LocalContentGenerator';
import { Button } from '@/src/presentation/components/ui/Button';
import { Check, RefreshCw, Smartphone, Monitor, Zap, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import styles from './WizardSteps.module.css';

export const StepGenerator = () => {
    const { data, nextStep, prevStep, updateData } = useWizard();
    const [generating, setGenerating] = useState(true);
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

    const generateAIContent = async () => {
        setGenerating(true);
        try {
            const prompt = `Write a DETAILED 1500-word Amazon product review for: "${data.selectedProduct?.title}". 
            Keyword: "${data.keyword}". Tone: "${data.tone}". 
            
            JSON Response Format:
            {
                "title": "SEO Optimized Title",
                "verdict": "2-3 sentence verdict",
                "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
                "description": "Intro paragraph",
                "articleBody": "Full review content (1000+ words). Use \\n\\n for paragraphs."
            }
            
            Article Sections:
            1. Introduction
            2. Performance
            3. Design
            4. Features
            5. Pros/Cons
            6. Conclusion

            CRITICAL: RETURN ONLY RAW JSON. NO MARKDOWN.`;

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



            // Validate before parsing - must start with {
            if (!contentStr || !contentStr.startsWith('{')) {
                console.error('Invalid content string detected (not JSON):', contentStr);
                throw new Error('AI returned a conversational response or malformed data');
            }

            const content = JSON.parse(contentStr);
            updateData({ generatedContent: content });
        } catch (error) {
            console.warn('AI Generation failed, switching to Local Content Generator:', error);
            // Use local smart generator if AI fails
            const localContent = LocalContentGenerator.generate(data.selectedProduct!);
            updateData({
                generatedContent: localContent
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
                height: '700px',
                margin: '0 auto',
                background: '#050505',
                borderRadius: device === 'desktop' ? '24px' : '48px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.7)',
                direction: 'rtl'
            }}>
                {/* Decorative Glows */}
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }}></div>
                <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }}></div>

                {/* Page Content */}
                <div style={{ height: '100%', overflowY: 'auto', color: '#fff', fontFamily: "'Inter', sans-serif", position: 'relative', zIndex: 1, scrollbarWidth: 'none' }}>

                    {/* Hero Section */}
                    <div style={{ padding: '60px 24px 80px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'row-reverse', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>

                            {/* Product Image */}
                            <div style={{ width: device === 'desktop' ? '280px' : '100%', flexShrink: 0 }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(99,102,241,0.2)', filter: 'blur(30px)', borderRadius: '50%' }}></div>
                                    <div style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '24px',
                                        padding: '24px',
                                        aspectRatio: '1/1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        zIndex: 1
                                    }}>
                                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                            <Image
                                                src={data.selectedProduct?.image || ''}
                                                alt="Product"
                                                fill
                                                style={{ objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }}
                                                sizes="300px"
                                            />
                                        </div>
                                        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', padding: '3px 8px', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                            <Zap size={8} style={{ color: '#f59e0b' }} /> TOP PICK
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div style={{ flex: 1, minWidth: '300px', textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '99px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>
                                    <ShieldCheck size={12} /> VERIFIED SCIENTIFIC REVIEW
                                </div>

                                <h1 style={{ fontSize: device === 'desktop' ? '2.5rem' : '1.8rem', fontWeight: 900, marginBottom: '20px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                                    {title}
                                </h1>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#a1a1aa' }}>Expert Rating: 4.9/5</span>
                                </div>

                                <p style={{ fontSize: '16px', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '32px', opacity: 0.9 }}>
                                    {description}
                                </p>

                                <div style={{
                                    padding: '14px 28px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                                    color: '#fff',
                                    fontSize: '16px',
                                    fontWeight: 900,
                                    width: 'fit-content',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 10px 20px -5px rgba(234,88,12,0.4)',
                                    cursor: 'pointer'
                                }}>
                                    عرض السعر والخصومات اليوم
                                    <ArrowRight size={18} style={{ transform: 'scaleX(-1)' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analysis Section */}
                    <div style={{ padding: '48px 48px', maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '60px', backdropFilter: 'blur(20px)' }}>
                            <h2 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ width: '3px', height: '24px', background: 'var(--primary)', borderRadius: '99px' }}></span>
                                تحليل الخبراء المتعمق
                            </h2>

                            <article style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.8' }}>
                                {(() => {
                                    const headers = [
                                        "Introduction", "Why We Chose This Product", "In-Depth Features Analysis",
                                        "Performance & Real-World Testing", "Design & Build Quality",
                                        "User Experience & Reviews Summary", "Final Conclusion"
                                    ];
                                    const regex = new RegExp(`(${headers.join('|')})`, 'g');
                                    const contentBody = data.generatedContent?.articleBody || "";
                                    const parts = contentBody.split(regex).filter(p => p.trim());

                                    const rendered = [];
                                    let i = 0;
                                    while (i < parts.length) {
                                        const part = parts[i].trim();
                                        if (headers.includes(part)) {
                                            rendered.push(<h3 key={`h-${i}`} style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginTop: '32px', marginBottom: '16px' }}>{part}</h3>);
                                            if (parts[i + 1]) {
                                                rendered.push(<p key={`p-${i}`} style={{ marginBottom: '24px', textAlign: 'justify' }}>{parts[i + 1].trim()}</p>);
                                                i += 2;
                                            } else i++;
                                        } else {
                                            rendered.push(
                                                <p key={`p-${i}`} style={{ marginBottom: '24px', textAlign: 'justify' }}>
                                                    {i === 0 && part.length > 50 ? (
                                                        <>
                                                            <span style={{ float: 'right', fontSize: '48px', lineHeight: '1', fontWeight: 900, color: 'var(--primary)', marginLeft: '12px', marginTop: '4px' }}>{part.charAt(0)}</span>
                                                            {part.slice(1)}
                                                        </>
                                                    ) : part}
                                                </p>
                                            );
                                            i++;
                                        }
                                    }
                                    return rendered.length > 0 ? rendered : <p>لا يوجد محتوى متاح حالياً.</p>;
                                })()}
                            </article>
                        </div>

                        {/* Verdict Sidebar (Simple Version for Preview) */}
                        <div style={{ marginTop: '32px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.05) 100%)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '24px', padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <Zap size={18} style={{ color: '#818cf8' }} />
                                <h3 style={{ fontSize: '16px', fontWeight: 900 }}>الخلاصة السريعة</h3>
                            </div>
                            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', borderRight: '2px solid rgba(99,102,241,0.3)', paddingRight: '12px' }}>
                                {verdict}
                            </p>
                        </div>
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
