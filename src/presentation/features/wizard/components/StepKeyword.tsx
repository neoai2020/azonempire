'use client';

import React, { useState } from 'react';
import { useWizard } from '@/src/presentation/features/wizard/context/wizard-context';
import { Button } from '@/src/presentation/components/ui/Button';
import { Input } from '@/src/presentation/components/ui/Input';
import { getKeywordSuggestions } from '@/src/infrastructure/api/keywords';
import { AlertCircle, Search } from 'lucide-react';
import styles from './WizardSteps.module.css';

export const StepKeyword = () => {
    const { data, updateData, nextStep } = useWizard();
    const [input, setInput] = useState(data.keyword);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setError('');
        setSuggestions([]);

        try {
            const results = await getKeywordSuggestions(input);
            setSuggestions(results);
        } catch (err: any) {
            setError(err.message || 'Failed to get suggestions. Please check your API configuration.');
        } finally {
            setLoading(false);
        }
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

            {error && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

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

            {suggestions.length === 0 && !loading && !error && input && (
                <div className={styles.directAction}>
                    <p>Or proceed directly with "{input}"</p>
                    <Button variant="outline" onClick={() => handleSelect(input)}>Use "{input}"</Button>
                </div>
            )}
        </div>
    );
};
