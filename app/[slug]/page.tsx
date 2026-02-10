'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/src/infrastructure/lib/supabase';
import { Star, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface ReviewData {
    review_title: string;
    review_verdict: string;
    review_features: string[];
    review_description: string;
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
    const [debugInfo, setDebugInfo] = useState<string>('');

    useEffect(() => {
        const fetchReview = async () => {
            try {
                // Try multiple slug variations to handle encoding issues
                const rawSlug = slug;
                const decodedSlug = decodeURIComponent(slug);
                const encodedSlug = encodeURIComponent(decodedSlug);

                console.log('[DEBUG] Trying slugs:', { rawSlug, decodedSlug, encodedSlug });

                // Method 1: Try raw slug from params
                let { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('slug', rawSlug)
                    .eq('status', 'Live')
                    .single();

                // Method 2: If failed, try decoded slug
                if (!data && rawSlug !== decodedSlug) {
                    console.log('[DEBUG] Retrying with decoded slug:', decodedSlug);
                    const res = await supabase
                        .from('projects')
                        .select('*')
                        .eq('slug', decodedSlug)
                        .eq('status', 'Live')
                        .single();
                    data = res.data;
                    error = res.error;
                }

                // Method 3: If failed, try encoded slug
                if (!data && rawSlug !== encodedSlug) {
                    console.log('[DEBUG] Retrying with encoded slug:', encodedSlug);
                    const res = await supabase
                        .from('projects')
                        .select('*')
                        .eq('slug', encodedSlug)
                        .eq('status', 'Live')
                        .single();
                    data = res.data;
                    error = res.error;
                }

                // Debug: Fetch ALL projects to see what's actually in DB (limit 5)
                const { data: allProjects } = await supabase
                    .from('projects')
                    .select('slug, status')
                    .limit(5);

                const dbSlugs = allProjects?.map(p => p.slug).join(', ');

                console.log('[DEBUG] Final Result:', data, 'Error:', error);

                if (error || !data) {
                    const info = `
Requested Slug: "${rawSlug}"
Decoded: "${decodedSlug}"
Encoded: "${encodedSlug}"
DB Error: ${error?.message || 'none'}
Code: ${error?.code || 'none'}
Sample DB Slugs: ${dbSlugs}
                    `.trim();
                    console.error('[DEBUG] 404 Info:', info);
                    setDebugInfo(info);
                    setNotFound(true);
                } else {
                    // Track view
                    await supabase
                        .from('projects')
                        .update({ views: (data.views || 0) + 1 })
                        .eq('id', data.id);

                    setReview(data);
                }
            } catch (e: any) {
                console.error('[DEBUG] Catch error:', e);
                setDebugInfo(`Catch error: ${e.message}`);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchReview();
    }, [slug]);

    const handleAffiliateClick = async () => {
        if (review?.affiliate_link) {
            // Track click
            const { data } = await supabase
                .from('projects')
                .select('id, clicks')
                .eq('slug', slug)
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
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fafafa',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #e5e7eb',
                    borderTopColor: '#6366f1',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (notFound || !review) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fafafa',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#111', marginBottom: '8px' }}>404</h1>
                <p style={{ fontSize: '1.1rem', color: '#666' }}>This review page doesn&apos;t exist or is no longer live.</p>
                {debugInfo && (
                    <pre style={{
                        marginTop: '24px',
                        padding: '16px',
                        background: '#1e1e1e',
                        color: '#0f0',
                        borderRadius: '8px',
                        maxWidth: '90vw',
                        overflow: 'auto',
                        fontSize: '0.75rem',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all'
                    }}>
                        {debugInfo}
                    </pre>
                )}
            </div>
        );
    }

    const features = Array.isArray(review.review_features)
        ? review.review_features
        : typeof review.review_features === 'string'
            ? JSON.parse(review.review_features || '[]')
            : [];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#fafafa',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: '#1a1a1a'
        }}>
            {/* Top Navigation */}
            <nav style={{
                background: '#111827',
                padding: '16px 0',
                borderBottom: '2px solid #6366f1'
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'white', letterSpacing: '-0.5px' }}>
                        BestReviews<span style={{ color: '#6366f1' }}>.</span>
                    </span>
                    <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem', color: '#9ca3af' }}>
                        <span>Home</span>
                        <span>Reviews</span>
                        <span>About</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)',
                padding: '60px 0 80px',
                color: 'white'
            }}>
                <div style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    padding: '0 24px',
                    display: 'flex',
                    gap: '48px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    {/* Product Image */}
                    {review.product_image && (
                        <div style={{
                            flex: '0 0 340px',
                            background: 'white',
                            borderRadius: '16px',
                            padding: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                        }}>
                            <img
                                src={review.product_image}
                                alt={review.review_title}
                                style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }}
                            />
                        </div>
                    )}

                    {/* Hero Text */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(99, 102, 241, 0.2)',
                            color: '#a5b4fc',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            marginBottom: '16px'
                        }}>
                            <ShieldCheck size={14} /> Verified Review
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: '16px',
                            letterSpacing: '-0.5px'
                        }}>
                            {review.review_title}
                        </h1>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '24px',
                            fontSize: '0.9rem',
                            color: '#9ca3af'
                        }}>
                            <div style={{ display: 'flex', gap: '2px', color: '#fbbf24' }}>
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#fbbf24" />)}
                            </div>
                            <span>Expert Review</span>
                            <span>•</span>
                            <span>Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>

                        <button
                            onClick={handleAffiliateClick}
                            style={{
                                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                                color: '#111',
                                border: 'none',
                                padding: '16px 32px',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            Check Price on Amazon <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '800px', margin: '-40px auto 0', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>

                {/* Quick Verdict Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid #6366f1'
                }}>
                    <h2 style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        marginBottom: '12px',
                        color: '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        ⚡ Quick Verdict
                    </h2>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#374151' }}>
                        {review.review_verdict}
                    </p>
                </div>

                {/* Description */}
                {review.review_description && (
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        marginBottom: '32px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>Overview</h2>
                        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4b5563' }}>
                            {review.review_description}
                        </p>
                    </div>
                )}

                {/* Key Features */}
                {features.length > 0 && (
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        marginBottom: '32px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>Key Features</h2>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {features.map((feature: string, i: number) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '12px',
                                    padding: '16px',
                                    background: '#f9fafb',
                                    borderRadius: '12px'
                                }}>
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        color: '#6366f1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        marginTop: '2px'
                                    }}>
                                        <CheckCircle size={16} />
                                    </div>
                                    <span style={{ fontSize: '1rem', lineHeight: 1.5, color: '#374151' }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Bottom */}
                <div style={{
                    background: 'linear-gradient(135deg, #111827, #1e293b)',
                    borderRadius: '16px',
                    padding: '40px',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Ready to buy?</h2>
                    <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Get the best deal on Amazon today.</p>
                    <button
                        onClick={handleAffiliateClick}
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                            color: '#111',
                            border: 'none',
                            padding: '16px 40px',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
                        }}
                    >
                        Check Price on Amazon <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                background: '#111827',
                padding: '32px 0',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '0.85rem'
            }}>
                <p>© {new Date().getFullYear()} BestReviews. As an Amazon Associate we earn from qualifying purchases.</p>
            </footer>
        </div>
    );
}
