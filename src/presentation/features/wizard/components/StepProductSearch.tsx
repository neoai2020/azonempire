'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useWizard } from '@/src/presentation/features/wizard/context/wizard-context';
import { Button } from '@/src/presentation/components/ui/Button';
import { searchProducts } from '@/src/infrastructure/api/amazon';
import { AmazonProduct } from '@/src/domain/entities';
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
                <div className={styles.loadingState}>
                    Searching Amazon...
                </div>
            ) : (
                <div className={styles.productGrid}>
                    {products.map((product, index) => (
                        <div key={`${product.asin || 'prod'}-${index}`} className={styles.productCard}>

                            // ... (inside component)
                            <div className={styles.productImage} style={{ position: 'relative', height: '200px' }}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <h3 className={styles.productTitle}>{product.title}</h3>
                            <div className={styles.productMeta}>
                                <span className={styles.price}>{product.price}</span>
                                <span className={styles.productRating}>★ {product.rating} ({product.reviews})</span>
                            </div>
                            <div className={styles.actionRow}>
                                <Button
                                    size="sm"
                                    onClick={() => handleSelect(product)}
                                    className={styles.selectButton}
                                >
                                    Select
                                </Button>
                                <a
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.externalLink}
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.backButtonContainer}>
                <Button variant="ghost" onClick={prevStep}>Back</Button>
            </div>
        </div>
    );
};
