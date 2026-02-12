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
    const [initialLoading, setInitialLoading] = useState(false);
    const [error, setError] = useState('');

    React.useEffect(() => {
        const fetchInitialSuggestions = async () => {
            setInitialLoading(true);
            try {
                const results = await getKeywordSuggestions('');
                setSuggestions(results);
            } catch (err: any) {
                console.error('Failed to fetch initial suggestions:', err);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchInitialSuggestions();
    }, []);

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

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDirectSearch = () => {
        const val = inputRef.current?.value || input;
        if (val.trim()) {
            handleSelect(val);
        }
    };

    return (
        <div className={styles.stepContainer}>
            <div className={styles.header}>
                <h2>What niche are we targeting?</h2>
                <p>Enter a broad keyword to get started.</p>
            </div>

            <div className={styles.searchBox}>
                <div style={{ flex: 1 }}>
                    <Input
                        ref={inputRef}
                        placeholder="e.g. Wireless Earbuds"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleDirectSearch()}
                    />
                </div>
                <Button onClick={handleDirectSearch} isLoading={loading} style={{ height: '46px' }}>
                    <Search size={18} />
                    Search Products
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

            {initialLoading && (
                <div style={{ marginTop: '20px', textAlign: 'center', opacity: 0.7 }}>
                    Loading hot niches...
                </div>
            )}

            {suggestions.length > 0 && (
                <div className={styles.suggestions}>
                    <h3>{!input ? '🔥 Hot right now' : 'Suggested Keywords'}</h3>
                    <div className={styles.chips}>
                        {suggestions.map((s, idx) => (
                            <button key={`${s}-${idx}`} className={styles.chip} onClick={() => handleSelect(s)}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {!loading && !initialLoading && !error && (
                <div className={styles.directAction} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                    <p>Ready to see results? Click <strong>Search Products</strong> to find items on Amazon.</p>
                </div>
            )}
        </div>
    );
};
