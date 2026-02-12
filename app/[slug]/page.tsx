'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/src/infrastructure/lib/supabase';
import { Star, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, Clock, Zap } from 'lucide-react';

interface ReviewData {
    review_title: string;
    review_verdict: string;
    review_features: string[];
    review_description: string;
    review_article_body?: string;
    product_image: string;
    affiliate_link: string;
    name: string;
}

export default function ReviewPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [review, setReview] = useState<ReviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        document.body.style.backgroundColor = '#050505';
        document.body.style.color = '#ffffff';
        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        };
    }, []);

    useEffect(() => {
        const fetchReview = async () => {
            if (!slug || !hasMounted) return;
            try {
                let decodedSlug = slug;
                try {
                    decodedSlug = decodeURIComponent(slug);
                } catch (e) {
                    console.error('Error decoding slug:', e);
                }

                let { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('slug', decodedSlug)
                    .eq('status', 'Live')
                    .single();

                if (error || !data) {
                    setNotFound(true);
                } else {
                    await supabase
                        .from('projects')
                        .update({ views: (data.views || 0) + 1 })
                        .eq('id', data.id);
                    setReview(data);
                }
            } catch (e) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchReview();
    }, [slug, hasMounted]);

    const handleAffiliateClick = () => {
        if (review?.affiliate_link) {
            window.open(review.affiliate_link, '_blank');
        }
    };

    if (!hasMounted || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (notFound || !review) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white">
                <h1 className="text-5xl font-bold mb-4">404</h1>
                <p className="text-xl text-slate-400">This review is no longer available.</p>
            </div>
        );
    }

    const title = review.review_title;
    const description = review.review_description;
    const contentBody = review.review_article_body || "";
    const verdict = review.review_verdict;

    return (
        <div dir="ltr" className="min-h-screen w-full bg-[#050505] font-sans selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }}></div>

            {/* Navbar */}
            <nav className="w-full bg-[#050505]/80 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl">
                <div dir="ltr" className="w-full mx-auto h-24 flex items-start justify-between relative">
                    <div style={{ marginLeft: '40px', paddingTop: '20px' }}>
                        <span style={{
                            fontSize: '1.6rem',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            color: '#ffffff',
                            userSelect: 'none'
                        }}>
                            Azon<span style={{ color: '#6366f1' }}>Empire</span>
                        </span>
                    </div>

                    <button
                        onClick={handleAffiliateClick}
                        style={{ marginTop: '20px', marginRight: '40px' }}
                        className="hidden md:flex bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-full text-sm font-bold transition-all items-center gap-2"
                    >
                        Check Live Price <ExternalLink size={16} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div style={{ padding: '60px 24px 80px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'row', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>

                    {/* Product Image */}
                    <div style={{ width: '280px', flexShrink: 0 }}>
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
                                    <img
                                        src={review.product_image}
                                        alt="Product"
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }}
                                    />
                                </div>
                                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', padding: '3px 8px', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <Zap size={8} style={{ color: '#f59e0b' }} /> TOP PICK
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div style={{ flex: 1, minWidth: '300px', textAlign: 'left' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '99px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>
                            <ShieldCheck size={12} /> VERIFIED SCIENTIFIC REVIEW
                        </div>

                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'white' }}>
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

                        <button
                            onClick={handleAffiliateClick}
                            style={{
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
                                cursor: 'pointer',
                                border: 'none'
                            }}
                        >
                            Check Today&apos;s Price & Discounts
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Analysis Section */}
            <div style={{ padding: '48px 24px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '60px', backdropFilter: 'blur(20px)' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
                        <span style={{ width: '3px', height: '24px', background: '#6366f1', borderRadius: '99px' }}></span>
                        Deep Dive Expert Analysis
                    </h2>

                    <div style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.8' }}>
                        {(() => {
                            const headers = [
                                "Introduction", "Why We Chose This Product", "In-Depth Features Analysis",
                                "Performance & Real-World Testing", "Design & Build Quality",
                                "User Experience & Reviews Summary", "Final Conclusion"
                            ];
                            const regex = new RegExp(`(${headers.join('|')})`, 'g');
                            const parts = contentBody.split(regex).filter(p => p.trim());

                            if (parts.length === 0) return <p key="no-content">لا يوجد محتوى متاح حالياً.</p>;

                            return parts.map((part, idx) => {
                                const trimmed = part.trim();
                                if (headers.includes(trimmed)) {
                                    return <h3 key={`h-${idx}`} style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginTop: '32px', marginBottom: '16px' }}>{trimmed}</h3>;
                                }

                                // Simplified drop cap logic for stability
                                const isFirstPara = idx === 0 || (idx === 1 && !headers.includes(parts[0].trim()));

                                return (
                                    <p key={`p-${idx}`} style={{ marginBottom: '24px', textAlign: 'justify' }}>
                                        {isFirstPara && trimmed.length > 50 ? (
                                            <>
                                                <span style={{ float: 'left', fontSize: '48px', lineHeight: '1', fontWeight: 900, color: '#6366f1', marginRight: '12px', marginTop: '4px' }}>{trimmed.charAt(0)}</span>
                                                {trimmed.slice(1)}
                                            </>
                                        ) : trimmed}
                                    </p>
                                );
                            });
                        })()}
                    </div>
                </div>

                {/* Verdict Box (Stacked below Analysis) */}
                <div style={{ marginTop: '32px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.05) 100%)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '24px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Zap size={18} style={{ color: '#818cf8' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: 900, color: 'white' }}>Quick Verdict</h3>
                    </div>
                    <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', borderLeft: '2px solid rgba(99,102,241,0.3)', paddingLeft: '12px' }}>
                        {verdict}
                    </p>
                </div>
            </div>

            {/* Footer Pride */}
            <div style={{ maxWidth: '1200px', margin: '100px auto 0', padding: '60px 24px 40px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '60px', marginBottom: '60px', opacity: 0.3 }}>
                    <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.2em', color: 'white' }}>TRUSTED REVIEWER</div>
                    <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.2em', color: 'white' }}>256-BIT ENCRYPTION</div>
                    <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.2em', color: 'white' }}>PRIME SHIPPING</div>
                </div>
                <p style={{ color: '#3f3f46', fontSize: '10px', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                    © {new Date().getFullYear()} AzonEmpire Review Network • Empowered by AI
                </p>
            </div>
        </div>
    );
}
