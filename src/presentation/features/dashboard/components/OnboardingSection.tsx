'use client';

import { LucideIcon, CheckCircle2, Circle, ArrowRight, Zap } from 'lucide-react';
import styles from './OnboardingSection.module.css';

interface OnboardingStep {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    action: () => void;
    completed: boolean;
    cta: string;
}

interface OnboardingSectionProps {
    title?: string;
    subtitle?: string;
    steps: OnboardingStep[];
    completedCount: number;
    totalCount: number;
}

export const OnboardingSection = ({
    title = 'Your Path to Empire',
    subtitle = 'Complete these steps to launch and scale your affiliate business.',
    steps,
    completedCount,
    totalCount
}: OnboardingSectionProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
                <div className={styles.progressBadge}>
                    <Zap size={14} className={styles.zapIcon} />
                    <span>{completedCount}/{totalCount} Complete</span>
                </div>
            </div>

            <div className={styles.stepsGrid}>
                {steps.map((step) => (
                    <button
                        key={step.id}
                        className={styles.stepCard}
                        onClick={(e) => {
                            console.log('Onboarding step clicked:', step.title);
                            step.action();
                        }}
                        type="button"
                    >
                        <div className={styles.stepIconWrapper} style={{ pointerEvents: 'none' }}>
                            <step.icon size={24} className={styles.stepIcon} />
                        </div>
                        <div className={styles.stepContent} style={{ pointerEvents: 'none' }}>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                            <div className={styles.stepCta}>
                                {step.cta}
                                <ArrowRight size={14} />
                            </div>
                        </div>
                        <div className={styles.checkWrapper} style={{ pointerEvents: 'none' }}>
                            {step.completed ? (
                                <CheckCircle2 className={styles.completedIcon} size={20} />
                            ) : (
                                <Circle className={styles.pendingIcon} size={20} />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
