'use client';

import React, { useState } from 'react';
import { OnboardingSection } from '@/src/presentation/features/dashboard/components/OnboardingSection';
import { BookOpen, Target, DollarSign, Search, PenTool, BarChart3, PlayCircle, Clock } from 'lucide-react';

const CATEGORIES = [
    { id: 'foundations', title: 'Foundations', icon: BookOpen },
    { id: 'keywords', title: 'Keywords', icon: Search },
    { id: 'niche', title: 'Niche Selection', icon: Target },
    { id: 'content', title: 'Content', icon: PenTool },
    { id: 'commissions', title: 'Commissions', icon: DollarSign },
    { id: 'scaling', title: 'Scaling', icon: BarChart3 }
];

const ALL_VIDEOS = [
    { id: 1, cat: 'keywords', title: 'How to find winning keywords', duration: '12:40', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' },
    { id: 2, cat: 'foundations', title: 'Amazon Affiliate Basics', duration: '15:20', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' },
    { id: 3, cat: 'scaling', title: 'SEO for Affiliate Marketers', duration: '18:15', thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1d1?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' },
    { id: 4, cat: 'content', title: 'High-Converting Product Reviews', duration: '10:10', thumbnail: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' },
    { id: 5, cat: 'niche', title: 'Niche Selection Strategies', duration: '14:30', thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' },
    { id: 6, cat: 'keywords', title: 'Keyword Research Tools', duration: '09:45', thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' },
    { id: 7, cat: 'content', title: 'Content Writing for Sales', duration: '11:20', thumbnail: 'https://images.unsplash.com/photo-1455391704239-59738a97ca44?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' },
    { id: 8, cat: 'content', title: 'On-Page SEO Checklist', duration: '13:05', thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde7?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' },
    { id: 20, cat: 'scaling', title: 'Scaling Your Empire', duration: '20:00', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400', youtubeId: 'mC6fJ6Bc2dg' }
];

type Video = typeof ALL_VIDEOS[0];

export default function AcademyPage() {
    const [activeCategory, setActiveCategory] = useState('foundations');
    const [playingVideo, setPlayingVideo] = useState<null | Video>(null);

    const trainingSteps = CATEGORIES.map((cat, index) => ({
        id: index + 1,
        title: cat.title,
        description: `Master ${cat.title} strategies to grow your empire.`,
        icon: cat.icon,
        action: () => {
            setActiveCategory(cat.id);
            setPlayingVideo(null); // Reset player when changing category
        },
        completed: false,
        cta: activeCategory === cat.id ? 'Viewing' : 'View Module'
    }));

    const filteredVideos = ALL_VIDEOS.filter(v => v.cat === activeCategory);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>Training Academy</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Follow this structured path to master the AzonEmpire system.
                </p>
            </div>

            <OnboardingSection
                title="Your Learning Path"
                subtitle="Select a module to view the training videos."
                steps={trainingSteps}
                completedCount={0}
                totalCount={6}
            />

            <div style={{ marginTop: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {CATEGORIES.find(c => c.id === activeCategory)?.title} Videos
                    </h2>
                    <span style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--primary)',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                    }}>
                        {filteredVideos.length} Lessons
                    </span>
                </div>

                {playingVideo ? (
                    <div style={{
                        width: '100%',
                        marginBottom: '40px',
                    }}>
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            background: '#0a0a0a',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            border: '1px solid var(--border-subtle)',
                            position: 'relative'
                        }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div style={{
                            marginTop: '24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            padding: '24px',
                            background: 'var(--bg-surface)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-subtle)'
                        }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>{playingVideo.title}</h2>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    Part of the {CATEGORIES.find(c => c.id === playingVideo.cat)?.title} module.
                                    Learn how to master this step for your affiliate empire.
                                </p>
                            </div>
                            <button
                                onClick={() => setPlayingVideo(null)}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                ← Back to Module Lessons
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px'
                    }}>
                        {filteredVideos.map(video => (
                            <div
                                key={video.id}
                                style={{
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease, border-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                }}
                                onClick={() => setPlayingVideo(video)}
                            >
                                <div style={{
                                    height: '160px',
                                    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${video.thumbnail})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(4px)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid rgba(255,255,255,0.3)'
                                    }}>
                                        <PlayCircle size={24} color="white" />
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '8px',
                                        right: '8px',
                                        background: 'rgba(0,0,0,0.8)',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        <Clock size={10} />
                                        {video.duration}
                                    </div>
                                </div>
                                <div style={{ padding: '16px' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>
                                        {video.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                        Part of the {CATEGORIES.find(c => c.id === video.cat)?.title} module.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{
                marginTop: '64px',
                padding: '40px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(19, 19, 22, 0.5) 100%)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                textAlign: 'center'
            }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px' }}>Need Expert Guidance?</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
                    Join our weekly live coaching calls to get your questions answered and see real-time empire building.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button style={{
                        padding: '12px 28px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        Register for Next Call
                    </button>
                    <button style={{
                        padding: '12px 28px',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        View Calendar
                    </button>
                </div>
            </div>
        </div>
    );
}
