import { useState, useEffect } from 'react';
import { Project, DashboardStats } from '@/src/domain/entities';
import { ProjectService } from '@/src/infrastructure/services/ProjectService';
import { supabase } from '@/src/infrastructure/lib/supabase';

export const useDashboardStats = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        total_assets: 0,
        total_views: 0,
        outbound_clicks: 0,
        conversion_estimation: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const projectService = new ProjectService();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    setLoading(false);
                    return;
                }

                const fetchedProjects = await projectService.getProjects(session.user.id);
                setProjects(fetchedProjects);

                const fetchedStats = await projectService.getDashboardStats(session.user.id);
                setStats(fetchedStats);

            } catch (err: any) {
                console.error('Error fetching dashboard data:', err);
                setError(err.message || 'Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { projects, stats, loading, error };
};
