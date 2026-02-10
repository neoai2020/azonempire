'use client';

import React from 'react';
import { PlayCircle } from 'lucide-react';

const ACADEMY_VIDEOS = [
    { id: 1, title: 'How to find winning keywords', desc: 'Learn the strategies used by top affiliates to find low-competition, high-profit keywords.' },
    { id: 2, title: 'Amazon Affiliate Basics', desc: 'Everything you need to know to start earning commissions from Amazon today.' },
    { id: 3, title: 'SEO for Affiliate Marketers', desc: 'Master the art of ranking your product reviews on the first page of Google.' },
    { id: 4, title: 'High-Converting Product Reviews', desc: 'The secret formula for writing reviews that actually make people click buy.' },
    { id: 5, title: 'Niche Selection Strategies', desc: 'How to pick a profitable niche that has room for growth and high search volume.' },
    { id: 6, title: 'Keyword Research Tools', desc: 'A walkthrough of the best free and paid tools to speed up your research.' },
    { id: 7, title: 'Content Writing for Sales', desc: 'Persuasive writing techniques to boost your conversion rates overnight.' },
    { id: 8, title: 'On-Page SEO Checklist', desc: 'The exact steps to optimize every page for maximum visibility and ranking.' },
    { id: 9, title: 'Building Backlinks Safely', desc: 'Learn how to increase your site authority without getting penalized.' },
    { id: 10, title: 'Analyzing Competitor Sites', desc: 'Reverse-engineer the success of your competitors to find gaps in the market.' },
    { id: 11, title: 'Maximizing Amazon Commissions', desc: 'Advanced hacks to increase your average order value and earnings.' },
    { id: 12, title: 'Social Media Traffic Flow', desc: 'Drive thousands of visitors from Facebook, Pinterest, and Instagram.' },
    { id: 13, title: 'Email Marketing for Affiliates', desc: 'Build an audience that returns to your site every time you post a new review.' },
    { id: 14, title: 'Amazon Policy Deep Dive', desc: 'Stay safe and protect your account by following the latest guidelines.' },
    { id: 15, title: 'Optimizing Your Review Site', desc: 'Speed, mobile-readiness, and user experience tips to keep visitors happy.' },
    { id: 16, title: 'Finding High-Ticket Products', desc: 'Focus on items that pay $50+ per sale to reach your goals faster.' },
    { id: 17, title: 'Data-Driven Product Choice', desc: 'Use sales data and trends to pick products before they go viral.' },
    { id: 18, title: 'Outsourcing Your Content', desc: 'Scale your business by hiring writers and editors to handle the work.' },
    { id: 19, title: 'Conversion Tracking & ROI', desc: 'How to see exactly what works and where your money is coming from.' },
    { id: 20, title: 'Scaling Your Empire', desc: 'Move from one site to ten using the repeatable AzonEmpire system.' }
];

export default function AcademyPage() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>Academy</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Master the AzonEmpire system with our step-by-step video training.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
            }}>
                {ACADEMY_VIDEOS.map(video => (
                    <div key={video.id} style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '16px',
                        transition: 'transform 0.2s ease, border-color 0.2s',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.borderColor = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        }}
                    >
                        <div style={{
                            height: '160px',
                            background: '#111',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-dim)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%)'
                            }} />
                            <PlayCircle size={48} color="var(--primary)" style={{ opacity: 0.8 }} />
                            <span style={{
                                position: 'absolute',
                                bottom: '8px',
                                right: '8px',
                                background: 'rgba(0,0,0,0.8)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                color: 'white'
                            }}>
                                10:24
                            </span>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-main)' }}>
                            {video.title}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5', flex: 1 }}>
                            {video.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
