'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/src/infrastructure/lib/supabase';
import { Star, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, Clock, Zap, Info } from 'lucide-react';

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

    // Force styles cleanup to ensure dark theme works
    useEffect(() => {
        // Reset body styles to allow dark theme
        document.body.style.backgroundColor = '#0B1120';
        document.body.style.color = '#ffffff';

        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        };
    }, []);

    useEffect(() => {
        const fetchReview = async () => {
            if (!slug) return;

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
    }, [slug]);

    const handleAffiliateClick = async () => {
        if (review?.affiliate_link) {
            const { data } = await supabase
                .from('projects')
                .select('id, clicks')
                .eq('slug', decodeURIComponent(slug))
                .single();

            if (data) {
                await supabase
                    .from('projects')
                    .update({ clicks: (data.clicks || 0) + 1 })
                    .eq('id', data.id);
            }
            window.open(review.affiliate_link, '_blank');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0B1120] text-white">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (notFound || !review) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1120] text-white">
                <h1 className="text-5xl font-bold mb-4">404</h1>
                <p className="text-xl text-slate-400">This review is no longer available.</p>
            </div>
        );
    }

    const features = Array.isArray(review.review_features)
        ? review.review_features
        : typeof review.review_features === 'string'
            ? JSON.parse(review.review_features || '[]')
            : [];

    return (
        <div dir="rtl" className="min-h-screen w-full bg-[#050505] font-sans selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none"></div>

            {/* Navbar */}
            <nav className="w-full bg-[#050505]/80 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <span className="text-2xl font-black tracking-tighter text-white">
                        AzonEmpire<span className="text-indigo-500">.</span>
                    </span>
                    <button
                        onClick={handleAffiliateClick}
                        className="hidden md:flex bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-full text-sm font-bold transition-all items-center gap-2"
                    >
                        Check Live Price <ExternalLink size={16} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div style={{ padding: '60px 0 80px', position: 'relative', zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div className="hero-container" style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        gap: '60px',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap'
                    }}>

                        {/* Product Presentation (Image) */}
                        <div className="image-wrapper" style={{ width: '300px', flexShrink: 0 }}>
                            {review.product_image && (
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(99,102,241,0.15)', filter: 'blur(40px)', borderRadius: '50%' }}></div>
                                    <div className="glass" style={{
                                        borderRadius: '24px',
                                        padding: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        aspectRatio: '1/1',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        zIndex: 10
                                    }}>
                                        <img
                                            src={review.product_image}
                                            alt={review.name}
                                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '16px',
                                            right: '16px',
                                            background: 'rgba(255,255,255,0.05)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            fontSize: '8px',
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            padding: '4px 10px',
                                            borderRadius: '99px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <Zap size={8} style={{ color: '#f59e0b' }} />
                                            Top Pick
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Title & Primary Action */}
                        <div className="content-wrapper" style={{ flex: 1, textAlign: 'right', minWidth: '320px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '4px 12px',
                                borderRadius: '99px',
                                background: 'rgba(99,102,241,0.1)',
                                border: '1px solid rgba(99,102,241,0.2)',
                                color: '#818cf8',
                                fontSize: '10px',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                marginBottom: '24px',
                                letterSpacing: '0.1em'
                            }}>
                                <ShieldCheck size={12} />
                                <span>Verified Scientific Review</span>
                            </div>

                            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                                {review.review_title}
                            </h1>

                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                                </div>
                                <span style={{ fontWeight: 700, color: '#a1a1aa' }}>Expert Rating: 4.9/5</span>
                                <span style={{ color: '#27272a' }}>|</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#52525b', fontSize: '12px' }}>
                                    <Clock size={14} />
                                    <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>تحديث: {new Date().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>

                            <p style={{ fontSize: '18px', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '40px', fontWeight: 500, opacity: 0.9, maxWidth: '700px' }}>
                                {review.review_description}
                            </p>

                            <button
                                onClick={handleAffiliateClick}
                                style={{
                                    padding: '16px 32px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                                    color: '#fff',
                                    fontSize: '18px',
                                    fontWeight: 900,
                                    boxShadow: '0 15px 30px -10px rgba(234,88,12,0.4)',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    width: 'fit-content',
                                    cursor: 'pointer',
                                    border: 'none'
                                }}
                            >
                                عرض السعر والخصومات اليوم
                                <ArrowRight style={{ transform: 'scaleX(-1)' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Section */}
            <div className="max-w-6xl mx-auto px-12 grid lg:grid-cols-12 gap-12 mt-12 relative z-20">

                {/* Main Content (Wide) */}
                <div className="lg:col-span-8 space-y-12">

                    {/* The Deep Dive */}
                    {review.review_article_body && (
                        <div style={{
                            background: 'rgba(17, 17, 17, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '40px',
                            padding: '60px',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.3 }}></div>

                            <h2 style={{
                                fontSize: '28px',
                                fontWeight: 900,
                                color: '#fff',
                                marginBottom: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                letterSpacing: '-0.02em'
                            }}>
                                <span style={{ width: '4px', height: '32px', background: 'var(--primary)', borderRadius: '99px', boxShadow: '0 0 15px var(--primary)' }}></span>
                                تحليل الخبراء المتعمق
                            </h2>

                            <article style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '2', fontWeight: 400 }}>
                                {(() => {
                                    // Robust splitting logic for text that might lack newlines
                                    const headers = [
                                        "Introduction",
                                        "Why We Chose This Product",
                                        "In-Depth Features Analysis",
                                        "Performance & Real-World Testing",
                                        "Design & Build Quality",
                                        "User Experience & Reviews Summary",
                                        "Final Conclusion"
                                    ];

                                    // Create a regex that captures these headers
                                    const regex = new RegExp(`(${headers.join('|')})`, 'g');
                                    const parts = review.review_article_body.split(regex).filter(p => p.trim());

                                    const rendered = [];
                                    let i = 0;
                                    while (i < parts.length) {
                                        const part = parts[i].trim();

                                        if (headers.includes(part)) {
                                            // This is a header
                                            rendered.push(
                                                <h3 key={`h-${i}`} style={{
                                                    fontSize: '22px',
                                                    fontWeight: 800,
                                                    color: '#fff',
                                                    marginTop: '48px',
                                                    marginBottom: '20px',
                                                    display: 'block'
                                                }}>
                                                    {part}
                                                </h3>
                                            );
                                            // The next part is the content for this header
                                            if (parts[i + 1]) {
                                                const content = parts[i + 1].trim();
                                                rendered.push(
                                                    <p key={`p-${i}`} style={{ marginBottom: '32px', opacity: 0.95, textAlign: 'justify' }}>
                                                        {content}
                                                    </p>
                                                );
                                                i += 2;
                                            } else {
                                                i++;
                                            }
                                        } else {
                                            // Regular paragraph (could be the very first part if intro header is missing)
                                            rendered.push(
                                                <p key={`p-${i}`} style={{ marginBottom: '32px', opacity: 0.95, textAlign: 'justify' }}>
                                                    {i === 0 && part.length > 50 ? (
                                                        <>
                                                            <span style={{
                                                                float: 'right',
                                                                fontSize: '64px',
                                                                lineHeight: '1',
                                                                fontWeight: 900,
                                                                color: 'var(--primary)',
                                                                marginLeft: '16px',
                                                                marginTop: '8px'
                                                            }}>
                                                                {part.charAt(0)}
                                                            </span>
                                                            {part.slice(1)}
                                                        </>
                                                    ) : part}
                                                </p>
                                            );
                                            i++;
                                        }
                                    }
                                    return rendered;
                                })()}
                            </article>
                        </div>
                    )}
                </div>

                {/* Sidebar Sticky (Narrow) */}
                <div className="lg:col-span-4" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>

                    {/* Verdict Box */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 100%)',
                        border: '1px solid rgba(99,102,241,0.2)',
                        borderRadius: '32px',
                        padding: '40px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                            <div style={{ padding: '12px', background: 'rgba(99,102,241,0.2)', borderRadius: '16px', color: '#818cf8', boxShadow: 'inset 0 0 10px rgba(99,102,241,0.2)' }}>
                                <Zap size={24} strokeWidth={2.5} />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>الخلاصة السريعة</h3>
                        </div>

                        <div style={{ position: 'relative', marginBottom: '40px', padding: '0 10px' }}>
                            <svg style={{ position: 'absolute', top: '-10px', right: '-10px', width: '32px', height: '32px', fill: 'rgba(99,102,241,0.2)' }} viewBox="0 0 24 24">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H3.017V21H5.017Z" />
                            </svg>
                            <p style={{
                                fontSize: '18px',
                                color: '#f8fafc',
                                lineHeight: '1.7',
                                fontWeight: 500,
                                fontStyle: 'italic',
                                opacity: 0.9,
                                textAlign: 'center'
                            }}>
                                {review.review_verdict}
                            </p>
                        </div>

                        <div style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#94a3b8' }}>Expert Score</span>
                                <span style={{ fontSize: '14px', fontWeight: 900, color: '#818cf8' }}>9.8/10</span>
                            </div>
                            <div style={{ height: '8px', width: '100%', background: 'rgba(99,102,241,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '98%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '99px', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}></div>
                            </div>
                        </div>

                        {/* Feature List inside Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {features.slice(0, 4).map((f: string, i: number) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: '15px', color: '#cbd5e1', fontWeight: 600, lineHeight: '1.4' }}>
                                    <div style={{ marginTop: '4px', padding: '4px', background: 'rgba(16,185,129,0.1)', borderRadius: '6px' }}>
                                        <CheckCircle2 size={12} style={{ color: '#10b981', flexShrink: 0 }} />
                                    </div>
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Pride */}
            <div style={{ maxWidth: '1200px', margin: '100px auto 0', padding: '60px 24px 40px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '60px', marginBottom: '60px', opacity: 0.3 }}>
                    <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.2em' }}>TRUSTED REVIEWER</div>
                    <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.2em' }}>256-BIT ENCRYPTION</div>
                    <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.2em' }}>PRIME SHIPPING</div>
                </div>
                <p style={{ color: '#3f3f46', fontSize: '10px', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                    © {new Date().getFullYear()} AzonEmpire Review Network • Empowered by AI
                </p>
            </div>
        </div>
    );
}
