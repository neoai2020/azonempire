'use client';

import React, { useEffect, useState } from 'react';
import { useWizard } from '@/lib/store/wizard-context';
import { Button } from '@/components/ui/Button';
import { searchProducts, AmazonProduct } from '@/lib/api/amazon';
import { ExternalLink, Check } from 'lucide-react';
import styles from './WizardSteps.module.css';

export const StepProductSearch = () => {
    const { data, updateData, nextStep, prevStep } = useWizard();
    const [products, setProducts] = useState<AmazonProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const results = await searchProducts(data.keyword);
            setProducts(results);
            setLoading(false);
        };
        fetchProducts();
    }, [data.keyword]);

    const handleSelect = (product: AmazonProduct) => {
        updateData({ selectedProduct: product });
        nextStep();
    };

    return (
        <div className={styles.stepContainer} style={{ maxWidth: '1000px' }}>
            <div className={styles.header}>
                <h2>Pick a Product</h2>
                <p>Found reliable products for "{data.keyword}"</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    Searching Amazon...
                </div>
            ) : (
                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <div key={product.asin} className={styles.productCard}>
                            <div className={styles.productImage}>
                                <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className={styles.productTitle}>{product.title}</h3>
                            <div className={styles.productMeta}>
                                <span className={styles.price}>{product.price}</span>
                                <span>★ {product.rating} ({product.reviews})</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                <Button
                                    size="sm"
                                    onClick={() => handleSelect(product)}
                                    style={{ flex: 1 }}
                                >
                                    Select
                                </Button>
                                <a
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-sm)'
                                    }}
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                <Button variant="ghost" onClick={prevStep}>Back</Button>
            </div>
        </div>
    );
};
