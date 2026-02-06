'use client';

import React from 'react';
import { WizardProvider, useWizard } from '@/lib/store/wizard-context';
import { StepKeyword } from '@/components/wizard/StepKeyword';
import { StepProductSearch } from '@/components/wizard/StepProductSearch';
import { StepAffiliateLink } from '@/components/wizard/StepAffiliateLink';
import { StepGenerator } from '@/components/wizard/StepGenerator';
import { StepDeploy } from '@/components/wizard/StepDeploy';
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
