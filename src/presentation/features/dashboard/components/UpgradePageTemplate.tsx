'use client';

import React from 'react';
import { Crown, Rocket, Zap, Briefcase, Play, FileText, Download, CheckCircle2 } from 'lucide-react';

interface UpgradePageProps {
    title: string;
    description: string;
    icon: any;
    accentColor: string;
    videos: { title: string; duration: string }[];
    tools: { title: string; type: string }[];
}

export const UpgradePageTemplate: React.FC<UpgradePageProps> = ({ title, description, icon: Icon, accentColor, videos, tools }) => {
    return (
        <div style={{ color: 'var(--text)', paddingBottom: '40px' }}>
            {/* Header */}
            <div style={{
                background: `linear-gradient(135deg, ${accentColor}22 0%, rgba(0,0,0,0) 100%)`,
                borderRadius: 'var(--radius-xl)',
                border: `1px solid ${accentColor}33`,
                padding: '40px',
                marginBottom: '32px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'flex',
                        height: '48px',
                        width: '48px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        backgroundColor: `${accentColor}22`,
                        color: accentColor,
                        marginBottom: '20px'
                    }}>
                        <Icon size={24} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', color: 'white' }}>{title}</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>{description}</p>
                </div>
                {/* Decorative glow */}
                <div style={{
                    position: 'absolute',
                    top: '-100px',
                    right: '-100px',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: accentColor,
                    filter: 'blur(150px)',
                    opacity: 0.1
                }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                {/* Main Content: Videos/Lessons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Training Modules</h3>
                    {videos.map((vid, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '16px',
                            transition: 'all 0.2s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = accentColor}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}>
                            <div style={{
                                width: '100px',
                                height: '60px',
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: accentColor
                            }}>
                                <Play size={20} fill="currentColor" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>{vid.title}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{vid.duration}</span>
                            </div>
                            <CheckCircle2 size={18} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                        </div>
                    ))}
                </div>

                {/* Sidebar: Resources/Tools */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Premium Tools</h3>
                    {tools.map((tool, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '20px'
                        }}>
                            <div style={{ color: accentColor, marginBottom: '12px' }}>
                                {tool.type === 'Software' ? <Zap size={20} /> : <FileText size={20} />}
                            </div>
                            <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>{tool.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Exclusive {tool.type} included in your upgrade.</p>
                            <button style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '10px',
                                background: accentColor,
                                color: 'black',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                <Download size={16} /> Access Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
