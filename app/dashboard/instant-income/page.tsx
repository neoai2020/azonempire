'use client';

import React, { useState } from 'react';
import { Facebook, Play, CheckCircle, Calculator, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import styles from './page.module.css';

const NICHES = [
    'All Niches', 'Weight Loss', 'Make Money Online', 'Health & Fitness',
    'Beauty & Skincare', 'Relationships', 'Tech & Gadgets', 'Pets', 'Home & Garden'
];

export default function InstantIncomePage() {
    const [selectedNiche, setSelectedNiche] = useState('All Niches');
    const [affiliateLink, setAffiliateLink] = useState('');

    const isReady = affiliateLink.trim().length > 5;

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <header className={styles.hero}>
                <div className={styles.heroIcon}>
                    <Facebook size={36} fill="currentColor" />
                </div>
                <p className={styles.heroSubtitle}>200+ Ready-To-Post Messages</p>
                <h1>Instant Income: Facebook Posts</h1>
                <p className={styles.heroDesc}>
                    Copy these proven posts, paste them in Facebook groups, and start making money TODAY. No tech skills needed!
                </p>
            </header>

            {/* Tutorial Section */}
            <section className={styles.tutorialCard}>
                <div className={styles.videoPlaceholder}>
                    <div className={styles.videoOverlay}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4b4b', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                            <div style={{ width: '8px', height: '8px', background: '#ff4b4b', borderRadius: '50%' }} />
                            WATCH INSTANT INCOME TUTORIAL
                        </div>
                    </div>
                    <Play size={48} fill="white" color="white" />
                    <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>WATCH FIRST</p>
                </div>
                <div className={styles.tutorialInfo}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        How to Use Instant Income
                    </h2>
                    <p>
                        Watch this quick tutorial to learn how to copy these Facebook posts and start making money instantly. Simple and easy!
                    </p>
                </div>
            </section>

            {/* Steps Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <CheckCircle size={24} color="var(--primary)" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>How to Use This (3 Simple Steps)</h2>
            </div>

            {/* Steps Grid */}
            <div className={styles.stepsGrid}>
                <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>1</div>
                    <h3 style={{ marginBottom: '12px' }}>Pick Your Niche</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Choose the niche that matches your affiliate offer. We have posts for Weight Loss, Make Money Online, and more!
                    </p>
                </div>
                <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>2</div>
                    <h3 style={{ marginBottom: '12px' }}>Enter Your Link</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Paste your affiliate link below. We'll automatically add it to all the posts for you. No manual work!
                    </p>
                </div>
                <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>3</div>
                    <h3 style={{ marginBottom: '12px' }}>Copy & Post</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Click "Copy" on any post and paste it into Facebook groups. Post 3-5 times per day for best results!
                    </p>
                </div>
            </div>

            {/* Facebook Strategy Box */}
            <div style={{
                background: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                marginBottom: '48px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <ExternalLink size={20} color="var(--primary)" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase' }}>How to find & post in Facebook groups</h3>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                    <p style={{ color: '#00ddeb', fontWeight: 600, marginBottom: '12px' }}>Step 1: Find Facebook Groups</p>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>Go to Facebook and search for keywords related to your niche.</li>
                        <li>Click "Groups" in the sidebar to see only relevant communities.</li>
                        <li>Join active groups with high engagement and daily posts.</li>
                    </ul>
                </div>
            </div>

            {/* Earnings Calculator */}
            <div className={styles.earningsCard}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#111', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
                        <Calculator size={16} color="var(--success)" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>How Much Can You Make?</span>
                    </div>
                </div>
                <div className={styles.earningsRow}>
                    <div className={styles.earningsStat}>
                        <span className={styles.earningsValue}>$250/day</span>
                        <span className={styles.earningsLabel}>Daily Total!</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-dim)' }}>=</div>
                    <div className={styles.earningsStat}>
                        <span className={styles.earningsValue}>$7,500/month</span>
                        <span className={styles.earningsLabel}>Just from copying and pasting!</span>
                    </div>
                </div>
                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    The more groups you join and post in, the more money you make. It's that simple!
                </p>
            </div>

            {/* Generator Interface */}
            <section className={styles.generatorSection}>
                <div className={styles.generatorHeader}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Get Your Posts Now</h2>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} /> STEP 1: CHOOSE YOUR NICHE
                    </p>
                </div>

                <div className={styles.filterRow}>
                    {NICHES.map(niche => (
                        <button
                            key={niche}
                            className={`${styles.nicheButton} ${selectedNiche === niche ? styles.active : ''}`}
                            onClick={() => setSelectedNiche(niche)}
                        >
                            {niche}
                        </button>
                    ))}
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <p style={{ color: '#818cf8', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowRight size={16} /> STEP 2: ENTER YOUR AFFILIATE LINK
                    </p>
                    <div className={styles.linkInputWrapper}>
                        <input
                            type="text"
                            className={styles.linkInput}
                            placeholder="https://your-affiliate-link.com"
                            value={affiliateLink}
                            onChange={(e) => setAffiliateLink(e.target.value)}
                        />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                        WE'LL AUTOMATICALLY ADD YOUR LINK TO ALL THE POSTS BELOW
                    </p>
                </div>

                <button className={`${styles.generateBtn} ${isReady ? styles.ready : ''}`}>
                    <CheckCircle size={20} />
                    SHOW ME MY 50 POSTS!
                </button>
            </section>
        </div>
    );
}
