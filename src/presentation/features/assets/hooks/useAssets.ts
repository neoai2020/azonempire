import { useState, useEffect } from 'react';
import { Project } from '@/src/domain/entities';
import { ProjectService } from '@/src/infrastructure/services/ProjectService';
import { supabase } from '@/src/infrastructure/lib/supabase';

export const useAssets = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const projectService = new ProjectService();

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setLoading(false);
                return;
            }

            const data = await projectService.getProjects(session.user.id);
            console.log('Fetched projects:', data); // Debug log
            setProjects(data);
        } catch (err: any) {
            console.error('Error fetching assets:', err);
            setError(err.message || 'Failed to fetch assets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string | number) => {
        if (!confirm('Are you sure you want to delete this asset?')) return;

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                alert('You must be logged in to delete assets.');
                return;
            }

            console.log(`[DEBUG] Attempting delete. ID: ${id} (Type: ${typeof id}), User: ${session.user.id}`);

            // 1. Verify existence and ownership first
            const { data: projectToCheck, error: fetchError } = await supabase
                .from('projects')
                .select('id, user_id')
                .eq('id', String(id))
                .maybeSingle(); // Use maybeSingle to handle 'not found' gracefully

            if (fetchError) {
                console.error('[DEBUG] Project validation failed:', fetchError);
                alert(`Error finding project: ${fetchError.message}`);
                return;
            }

            if (!projectToCheck) {
                console.warn('[DEBUG] Project not found in database. It may have already been deleted.');
                // Silent refresh is better UX than an alert for something that's "already done"
                await fetchProjects();
                return;
            }

            if (projectToCheck.user_id !== session.user.id) {
                console.error(`[DEBUG] User mismatch! Project owner: ${projectToCheck.user_id}, Current user: ${session.user.id}`);
                alert('You do not have permission to delete this project (User Mismatch).');
                return;
            }

            // 2. Perform deletion
            const { error: deleteError, count } = await supabase
                .from('projects')
                .delete({ count: 'exact' })
                .eq('id', String(id));

            if (deleteError) {
                console.error('[DEBUG] Supabase delete error:', deleteError);
                if (deleteError.code === '23503') {
                    alert('Cannot delete this project because it is referenced by other records (e.g., analytics or generated content). Please contact support for manual cleanup.');
                } else {
                    alert(`Delete failed: ${deleteError.message} (Code: ${deleteError.code || 'Unknown'})`);
                }
                throw deleteError;
            }

            if (count === 0) {
                console.warn('[DEBUG] Delete command ran but 0 rows were affected.');
                alert('Deletion technically succeeded but 0 rows were removed. This is unexpected since we verified the item exists.');
                await fetchProjects();
                return;
            }

            console.log('[DEBUG] Deletion successful.');
            // Optimistic update
            setProjects(prev => prev.filter(p => String(p.id) !== String(id)));

            // Verify with server refresh
            await fetchProjects();
        } catch (err: any) {
            console.error('Error deleting project:', err);
            alert(`Failed to delete asset: ${err.message || 'Unknown error'}`);
        }
    };

    return { projects, loading, error, handleDelete };
};
