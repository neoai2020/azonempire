'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AmazonProduct } from '@/lib/api/amazon';

interface WizardData {
    keyword: string;
    selectedProduct: AmazonProduct | null;
    affiliateLink: string;
    template: string;
    tone: 'clean' | 'excited' | 'aggressive';
}

interface WizardContextType {
    data: WizardData;
    setData: React.Dispatch<React.SetStateAction<WizardData>>;
    step: number;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateData: (partial: Partial<WizardData>) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<WizardData>({
        keyword: '',
        selectedProduct: null,
        affiliateLink: '',
        template: 'modern',
        tone: 'clean',
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => Math.max(1, prev - 1));
    const updateData = (partial: Partial<WizardData>) => setData(prev => ({ ...prev, ...partial }));

    return (
        <WizardContext.Provider value={{ data, setData, step, setStep, nextStep, prevStep, updateData }}>
            {children}
        </WizardContext.Provider>
    );
};

export const useWizard = () => {
    const context = useContext(WizardContext);
    if (!context) throw new Error('useWizard must be used within a WizardProvider');
    return context;
};
