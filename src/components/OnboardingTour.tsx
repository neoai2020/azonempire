'use client';

import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const OnboardingTour = () => {
    useEffect(() => {
        const hasSeenTour = localStorage.getItem('onboarding_tour_seen');
        console.log('OnboardingTour mounted. hasSeenTour:', hasSeenTour);

        // For debugging: Uncomment next line to force tour reset
        // localStorage.removeItem('onboarding_tour_seen');

        if (!hasSeenTour || true) { // FORCE SHOW for testing (remove || true later)
            console.log('Initializing driver...');
            const driverObj = driver({
                showProgress: true,
                popoverClass: 'driver-popover-theme',
                steps: [

                    {
                        element: '#nav-item-dashboard',
                        popover: {
                            title: 'Dashboard Home',
                            description: 'Return here anytime to see your stats and active projects.',
                            side: 'right',
                            align: 'center'
                        }
                    },
                    {
                        element: '#nav-item-wizard',
                        popover: {
                            title: 'AI Asset Wizard',
                            description: 'The core of your empire. Use this to find products and generate AI content.',
                            side: 'right',
                            align: 'center'
                        }
                    },
                    {
                        element: '#nav-item-my-assets',
                        popover: {
                            title: 'Asset Manager',
                            description: 'View, edit, and manage all your created sites and campaigns.',
                            side: 'right',
                            align: 'center'
                        }
                    },
                    {
                        element: '#nav-item-boost',
                        popover: {
                            title: 'Traffic Boost',
                            description: 'Supercharge your assets with AI-generated marketing campaigns.',
                            side: 'right',
                            align: 'center'
                        }
                    },
                    {
                        element: '#performance-overview',
                        popover: {
                            title: 'Track Performance',
                            description: 'Real-time analytics for all your assets in one place.',
                            side: 'bottom',
                            align: 'start'
                        }
                    },
                    {
                        element: '#recent-assets',
                        popover: {
                            title: 'Recent Activity',
                            description: 'Quick access to your most recently updated projects.',
                            side: 'top',
                            align: 'start'
                        }
                    },
                    {
                        element: '#support-banner',
                        popover: {
                            title: 'Need Help?',
                            description: 'Our support team is available 24/7 to assist you. Click here anytime.',
                            side: 'top',
                            align: 'center'
                        }
                    }
                ],
                onDestroyStarted: () => {
                    localStorage.setItem('onboarding_tour_seen', 'true');
                    driverObj.destroy();
                },
            });

            // Retry mechanism to ensure elements are loaded
            let attempts = 0;
            const checkElementsAndStart = () => {
                const step1 = document.querySelector('#nav-item-dashboard');
                if (step1) {
                    console.log('Target element found. Starting tour...');
                    driverObj.drive();
                } else if (attempts < 10) {
                    console.log('Target element not found, retrying...', attempts);
                    attempts++;
                    setTimeout(checkElementsAndStart, 500);
                } else {
                    console.error('Failed to find onboarding section after multiple attempts.');
                }
            };

            checkElementsAndStart();
        }
    }, []);

    return null;
};
