'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/src/presentation/components/ui/Button';
import styles from './VideoCard.module.css';

export const VideoCard = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h2 className={styles.title}>Welcome back to AzonEmpire</h2>
                    <p className={styles.subtitle}>Watch this 3-minute guide to launch your first asset.</p>
                    <Button onClick={() => window.location.href = '/dashboard/wizard'}>
                        Start Wizard
                    </Button>
                </div>

                <div className={styles.videoWrapper} onClick={() => setIsPlaying(true)}>
                    {!isPlaying ? (
                        <div className={styles.thumbnail}>
                            <div className={styles.playButton}>
                                <Play fill="white" size={24} />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.placeholderVideo}>
                            Video Player Placeholder
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
