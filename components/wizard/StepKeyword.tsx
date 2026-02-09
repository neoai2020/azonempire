'use client';

import React, { useState } from 'react';
import { useWizard } from '@/lib/store/wizard-context';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getKeywordSuggestions } from '@/lib/api/keywords';
import { Search } from 'lucide-react';
import styles from './WizardSteps.module.css';

export const StepKeyword = () => {
    const { data, updateData, nextStep } = useWizard();
    const [input, setInput] = useState(data.keyword);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!input.trim()) return;
        setLoading(true);
        const results = await getKeywordSuggestions(input);
        setSuggestions(results);
        setLoading(false);
    };

    const handleSelect = (keyword: string) => {
        updateData({ keyword });
        nextStep();
    };

    return (
        <div className={styles.stepContainer}>
            <div className={styles.header}>
                <h2>What niche are we targeting?</h2>
                <p>Enter a broad keyword to get started.</p>
            </div>

            <div className={styles.searchBox}>
                <Input
                    placeholder="e.g. Wireless Earbuds"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} isLoading={loading}>
                    <Search size={18} />
                    Find Ideas
                </Button>
            </div>

            {suggestions.length > 0 && (
                <div className={styles.suggestions}>
                    <h3>Suggested Keywords</h3>
                    <div className={styles.chips}>
                        {suggestions.map((s) => (
                            <button key={s} className={styles.chip} onClick={() => handleSelect(s)}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {suggestions.length === 0 && !loading && input && (
                <div className={styles.directAction}>
                    <p>Or proceed directly with "{input}"</p>
                    <Button variant="outline" onClick={() => handleSelect(input)}>Use "{input}"</Button>
                </div>
            )}
        </div>
    );
};
