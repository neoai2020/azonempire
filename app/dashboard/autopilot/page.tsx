'use client';

import React, { useState } from 'react';
import { Rocket, Play, CheckCircle, Users, ExternalLink, ArrowRight, Zap, Target } from 'lucide-react';
import styles from './page.module.css';

const TRAFFIC_SOURCES = [
    { title: 'MyFitnessPal Community', type: 'FORUM', level: 'EASY', traffic: '200-500 visitors/month', time: '10 minutes' },
    { title: 'SparkPeople Forums', type: 'FORUM', level: 'EASY', traffic: '150-400 visitors/month', time: '10 minutes' },
    { title: '3FatChicks Forum', type: 'FORUM', level: 'EASY', traffic: '100-300 visitors/month', time: '8 minutes' },
    { title: 'LoseIt! Reddit Community', type: 'SOCIAL', level: 'EASY', traffic: '300-800 visitors/month', time: '5 minutes' }
];

const NICHES = ['All', 'Weight Loss', 'Make Money Online', 'Health & Fitness', 'Tech & Gadgets', 'Beauty & Skincare', 'Relationships', 'Pets', 'Home & Garden'];

export default function AutopilotPage() {
    const [pageUrl, setPageUrl] = useState('');
    const [selectedNiche, setSelectedNiche] = useState('All');

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <header className={styles.hero}>
                <div className={styles.heroIcon}>
                    <Zap size={36} fill="currentColor" />
                </div>
                <p className={styles.heroSubtitle}>100+ Free Traffic Sources - Submit Once, Get Traffic Forever</p>
                <h1>Automated Income - Traffic On Autopilot</h1>
                <p className={styles.heroDesc}>
                    Stop chasing traffic every day. Submit your link to these 100+ sites ONCE and get ongoing traffic automatically.
                </p>
            </header>

            {/* Tutorial Section */}
            <section className={styles.tutorialCard}>
                <div className={styles.videoPlaceholder}>
                    <Play size={48} fill="white" color="white" />
                    <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>WATCH FIRST</p>
                </div>
                <div className={styles.tutorialInfo}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        How to Use Automated Income
                    </h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Watch this quick tutorial to learn how to submit your link to these 100+ traffic sources and get automated traffic forever!
                    </p>
                </div>
            </section>

            {/* Secret Box */}
            <div className={styles.secretBox}>
                <h3 className={styles.secretTitle}>
                    <Target size={20} />
                    How This Works (Super Simple!)
                </h3>
                <div style={{ background: '#000', padding: '24px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--success)' }}>
                    <p style={{ fontWeight: 700, marginBottom: '12px', fontSize: '1.1rem' }}>The Secret To Automated Traffic:</p>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.95rem' }}>
                        Most people waste hours every day posting on social media for traffic.
                    </p>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '0.95rem' }}>
                        But what if you could submit your link ONCE and get traffic for months or even YEARS?
                    </p>
                    <p style={{ color: 'var(--success)', fontWeight: 600 }}>
                        That's exactly what these traffic sources do. You submit once, and they send you visitors automatically - no daily work required!
                    </p>
                </div>
            </div>

            {/* Steps Grid */}
            <div className={styles.stepsGrid}>
                <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>1</div>
                    <h3 style={{ marginBottom: '12px' }}>Pick Your Niche</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Choose your niche below and get 100+ traffic sources specifically for your market.
                    </p>
                </div>
                <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>2</div>
                    <h3 style={{ marginBottom: '12px' }}>Submit Your Link</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Follow the simple step-by-step instructions to submit your link to each site. Takes 5-15 minutes per site.
                    </p>
                </div>
                <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>3</div>
                    <h3 style={{ marginBottom: '12px' }}>Get Automatic Traffic</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Once submitted, these sites send you traffic automatically. No daily work needed!
                    </p>
                </div>
            </div>

            {/* Control Panel */}
            <section className={styles.controlPanel}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '24px' }}>Enter Your Page URL:</h2>
                <input
                    type="text"
                    className={styles.urlInput}
                    placeholder="https://your-page-url.com"
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                />

                <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    marginBottom: '32px',
                    padding: '8px',
                    background: '#111',
                    borderRadius: '12px'
                }}>
                    {NICHES.map(niche => (
                        <button
                            key={niche}
                            onClick={() => setSelectedNiche(niche)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                background: selectedNiche === niche ? 'var(--success)' : 'transparent',
                                color: selectedNiche === niche ? 'white' : 'var(--text-muted)',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            {niche}
                        </button>
                    ))}
                </div>

                <div className={styles.progressWrapper}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700 }}>
                        <span style={{ color: 'var(--text-dim)' }}>YOUR PROGRESS:</span>
                        <span style={{ color: 'var(--success)' }}>0% COMPLETE</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: '0%' }} />
                    </div>
                </div>
            </section>

            {/* Source Grid */}
            <div className={styles.sourceGrid}>
                {TRAFFIC_SOURCES.map((source, i) => (
                    <div key={i} className={styles.sourceCard}>
                        <div className={styles.cardHeader}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{source.title}</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span className={`${styles.badge} ${styles.badgeForum}`}>{source.type}</span>
                                <span className={`${styles.badge} ${styles.badgeEasy}`}>{source.level}</span>
                            </div>
                        </div>
                        <div className={styles.sourceStats}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Users size={14} /> {source.traffic}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Play size={14} /> {source.time}
                            </span>
                        </div>
                        <button className={styles.viewBtn}>
                            <ExternalLink size={18} />
                            VIEW INSTRUCTIONS
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
