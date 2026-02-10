'use client';

import React from 'react';
import { Crown, Play, TrendingUp, User, ChevronRight, PlayCircle, Zap } from 'lucide-react';
import styles from './page.module.css';

const TRAINING_VIDEOS = [
    { id: 1, title: 'How to Use Your DFY Vault', desc: 'Watch this quick tutorial to learn how to copy these proven articles and start making money today. It only takes 3 minutes!', type: 'main' },
    { id: 2, title: 'How To Turn A Measly $5 Into $50, $100, And Even $500 Every Single Day...', type: 'side' },
    { id: 3, title: 'How To Hijack Top Publications Traffic In Less Than 9 Minutes...', type: 'side' }
];

const ARTICLES = [
    {
        id: 1,
        niche: 'WEIGHT LOSS',
        earnings: '$347/day',
        title: 'How I Lost 47 Pounds in 90 Days Without Starving Myself',
        author: 'Sarah M.',
        bestFor: 'Weight loss supplements, meal plans, fitness programs'
    },
    {
        id: 2,
        niche: 'MAKE MONEY ONLINE',
        earnings: '$412/day',
        title: "I Made $3,847 Last Month Working From My Couch (Here's How)",
        author: 'Mike T.',
        bestFor: 'Make money online courses, affiliate marketing training, business opportunities'
    },
    {
        id: 3,
        niche: 'BUSINESS SOFTWARE',
        earnings: '$289/day',
        title: 'This $47 Software Replaced My $2,000/Month Marketing Team',
        author: 'Jennifer L.',
        bestFor: 'Marketing automation tools, digital marketing platforms'
    },
    {
        id: 4,
        niche: 'DATING',
        earnings: '$198/day',
        title: 'My Dating Life Was Dead Until I Tried This App (Now I Have 3 Dates This Week)',
        author: 'David R.',
        bestFor: 'Dating apps, compatibility matching tools'
    },
    {
        id: 5,
        niche: 'CRYPTOCURRENCY',
        earnings: '$523/day',
        title: 'I Turned $500 Into $8,300 in 60 Days With This Crypto Strategy',
        author: 'Alex K.',
        bestFor: 'Cryptocurrency trading courses, investment strategies'
    },
    {
        id: 6,
        niche: 'FITNESS',
        earnings: '$275/day',
        title: 'This Home Workout Program Gave Me Abs in 8 Weeks (No Gym Required)',
        author: 'Rachel P.',
        bestFor: 'Home workout programs, fitness apps'
    }
];

export default function DFYVaultPage() {
    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <header className={styles.hero}>
                <div className={styles.heroIcon}>
                    <Crown size={32} fill="currentColor" />
                </div>
                <p className={styles.heroSubtitle}>50 PROVEN ARTICLES READY TO COPY & EARN</p>
                <h1>Welcome to Your DFY Vault!</h1>
                <p className={styles.heroDesc}>
                    These articles have generated over $500,000 in commissions for our members. Just copy any article, add your affiliate link where indicated, and start earning today.
                </p>
            </header>

            {/* Training Grid */}
            <div className={styles.trainingGrid}>
                <div className={styles.videoCard}>
                    <div className={styles.videoThumb}>
                        <div className={styles.playIcon}>
                            <Play fill="white" size={24} />
                        </div>
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', fontSize: '0.75rem', fontWeight: 800 }}>
                            <Zap size={14} fill="#0ea5e9" />
                            QUICK START
                        </div>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{TRAETING_VIDEOS[0].title}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {TRAETING_VIDEOS[0].desc}
                    </p>
                </div>

                <div className={styles.sideVideos}>
                    {TRAETING_VIDEOS.slice(1).map((v, i) => (
                        <div key={v.id} className={styles.miniVideo}>
                            <div className={styles.miniThumb}>
                                <Play fill="var(--primary)" size={16} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', marginBottom: '4px', fontWeight: 600 }}>{v.title}</h3>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Play size={10} fill="currentColor" /> WATCH EXCLUSIVE TRAINING #{i + 1}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Article Section Header */}
            <div className={styles.sectionHeader}>
                <div className={styles.headerIcon}>
                    <TrendingUp size={20} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>50 Proven Money-Making Articles</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                        Click "Use This Article" and we'll create a page for you automatically
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className={styles.articleGrid}>
                {ARTICLES.map(article => (
                    <div key={article.id} className={styles.articleCard}>
                        <div className={styles.cardTop}>
                            <span className={styles.nicheTag}>{article.niche}</span>
                            <div className={styles.earningsInfo}>
                                <TrendingUp size={14} />
                                {article.earnings}
                            </div>
                        </div>

                        <h3 className={styles.articleTitle}>{article.title}</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                            <User size={14} />
                            By {article.author}
                        </div>

                        <div className={styles.bestForBox}>
                            <span className={styles.bestForTitle}>Best For:</span>
                            <p className={styles.bestForText}>{article.bestFor}</p>
                        </div>

                        <button className={styles.useBtn}>
                            USE THIS ARTICLE
                            <ChevronRight size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '40px' }}>
                MORE ARTICLES BEING ADDED WEEKLY
            </p>
        </div>
    );
}

// Fix accidental typos in constant names (TRAETING_VIDEOS -> TRAINING_VIDEOS)
const TRAETING_VIDEOS = TRAINING_VIDEOS;
