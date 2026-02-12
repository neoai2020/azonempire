'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Crown, Zap, Rocket, Briefcase, Sparkles } from 'lucide-react';

const UPGRADES_CONTENT: any = {
    '10x-profit': {
        title: '10x Profit System',
        subtitle: 'Multiply your affiliate commissions with advanced AI targeting.',
        icon: Crown,
        accent: 'from-amber-400 to-orange-500',
        badge: 'VIP UPGRADE',
        benefitsTitle: 'What you get inside',
        features: [
            'Advanced Niche Research Blueprint',
            'Competitor Analysis Spy Toolkit',
            'High-Ticket Product Finder Framework'
        ],
        cta: 'Launch 10x Profit System'
    },
    'traffic-booster': {
        title: 'Traffic Booster',
        subtitle: 'Drive consistent, hands-free visitors to your review assets.',
        icon: Rocket,
        accent: 'from-rose-400 to-pink-500',
        badge: 'TRAFFIC ENGINE',
        benefitsTitle: 'Traffic automation stack',
        features: [
            'One-Click Social Distribution',
            'SEO Auto-Optimization Engine',
            'Smart Backlink Generator'
        ],
        cta: 'Activate Traffic Booster'
    },
    'conversion-master': {
        title: 'Conversion Master',
        subtitle: 'Turn curious visitors into buyers using proven psychology.',
        icon: Zap,
        accent: 'from-purple-400 to-violet-500',
        badge: 'CONVERSION LAB',
        benefitsTitle: 'Conversion power moves',
        features: [
            'Exit-Intent & Scarcity Playbook',
            'Dynamic Countdown & Urgency Widgets',
            'Bonus Page Templates Library'
        ],
        cta: 'Open Conversion Master'
    },
    'agency-hub': {
        title: 'Agency Hub',
        subtitle: 'Package your results and start charging clients like an agency.',
        icon: Briefcase,
        accent: 'from-sky-400 to-blue-500',
        badge: 'AGENCY MODE',
        benefitsTitle: 'Built for client work',
        features: [
            'Client Management Command Center',
            'White-Label Reporting Suite',
            'Team & VA Access Controls'
        ],
        cta: 'Enter Agency Hub'
    }
};

export default function UpgradePage() {
    const params = useParams();
    const slug = params.slug as string;
    const content = UPGRADES_CONTENT[slug];

    if (!content) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="rounded-2xl border border-dashed border-slate-300/70 bg-slate-50 px-6 py-4 text-sm text-slate-600">
                    Upgrade not found or not available yet.
                </div>
            </div>
        );
    }

    const Icon = content.icon;

    return (
        <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-8">
            {/* Header + Status */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-7 sm:px-10 sm:py-9 shadow-[0_24px_80px_rgba(15,23,42,0.75)]">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-emerald-500/30 blur-3xl" />
                    <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-indigo-500/25 blur-3xl" />
                </div>

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="relative">
                            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-emerald-400/40 to-cyan-500/40 blur-md" />
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900/70 ring-1 ring-emerald-400/40">
                                <Icon size={34} className="text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.75)]" />
                            </div>
                            <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-950 bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]">
                                <span className="h-2 w-2 rounded-full bg-white" />
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 ring-1 ring-emerald-400/30">
                                <Sparkles size={12} />
                                <span>UNLOCKED • {content.badge}</span>
                            </div>

                            <h1 className="text-balance text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                                {content.title}
                            </h1>
                            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                                {content.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch gap-3 sm:w-56">
                        <button
                            className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(16,185,129,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(16,185,129,0.65)]"
                        >
                            <span className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,_white/55,_transparent_55%)] opacity-0 mix-blend-screen transition-opacity duration-300 hover:opacity-100" />
                            <span>{content.cta}</span>
                        </button>
                        <p className="text-[11px] text-slate-400">
                            Tip: You can always come back here from the <span className="font-semibold text-slate-200">My Upgrades</span> area in your sidebar.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features / Content */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
                <div className="space-y-5 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.85)]">
                    <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
                        <span>{content.benefitsTitle}</span>
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {content.features.map((feature: string, i: number) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/90 px-4 py-4 text-sm text-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.9)] transition-transform hover:-translate-y-0.5 hover:border-emerald-400/40"
                            >
                                <div className="pointer-events-none absolute -right-8 -top-10 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl transition-opacity group-hover:opacity-80" />
                                <p className="relative">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.9)]">
                        <div className="pointer-events-none absolute inset-0 opacity-40">
                            <div className={`absolute -left-10 top-0 h-24 w-24 rounded-full bg-gradient-to-br ${content.accent} blur-2xl`} />
                        </div>
                        <div className="relative space-y-2 text-sm text-slate-200">
                            <p className="font-semibold text-slate-100">
                                You own this upgrade.
                            </p>
                            <p className="text-slate-300">
                                All the tools, automation, and templates listed here are now tied to your AzonEmpire account.
                                You can log in from any device and they will still be available under your profile.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-[11px] text-slate-400">
                        <p>
                            Need help getting results faster? Reach out to support from inside the main dashboard and mention
                            <span className="font-semibold text-slate-200"> “{content.title}”</span> so our team can see which upgrade you unlocked.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

