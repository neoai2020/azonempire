import { useState, useEffect } from 'react';
import { Project } from '@/src/domain/entities';
import { ProjectService } from '@/src/infrastructure/services/ProjectService';
import { supabase } from '@/src/infrastructure/lib/supabase';

export const useAssets = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const projectService = new ProjectService();

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    setLoading(false);
                    return;
                }

                const data = await projectService.getProjects(session.user.id);
                setProjects(data);
            } catch (err: any) {
                console.error('Error fetching assets:', err);
                setError(err.message || 'Failed to fetch assets');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this asset?')) return;

        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err: any) {
            console.error('Error deleting project:', err);
            alert('Failed to delete asset');
        }
    };

    return { projects, loading, error, handleDelete };
};
