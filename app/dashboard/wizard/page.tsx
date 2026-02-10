'use client';

import React from 'react';
import { WizardProvider, useWizard } from '@/src/presentation/features/wizard/context/wizard-context';
import { StepKeyword } from '@/src/presentation/features/wizard/components/StepKeyword';
import { StepProductSearch } from '@/src/presentation/features/wizard/components/StepProductSearch';
import { StepAffiliateLink } from '@/src/presentation/features/wizard/components/StepAffiliateLink';
import { StepGenerator } from '@/src/presentation/features/wizard/components/StepGenerator';
import { StepDeploy } from '@/src/presentation/features/wizard/components/StepDeploy';
import styles from './page.module.css';

const WizardContent = () => {
    const { step } = useWizard();

    const renderStep = () => {
        switch (step) {
            case 1: return <StepKeyword />;
            case 2: return <StepProductSearch />;
            case 3: return <StepAffiliateLink />;
            case 4: return <StepGenerator />;
            case 5: return <StepDeploy />;
            default: return null;
        }
    };

    const progress = (step / 5) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.stepWrapper}>
                {renderStep()}
            </div>
        </div>
    );
};

export default function WizardPage() {
    return (
        <WizardProvider>
            <WizardContent />
        </WizardProvider>
    );
}
