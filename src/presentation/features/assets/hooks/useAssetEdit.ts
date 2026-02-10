import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/src/domain/entities';
import { supabase } from '@/src/infrastructure/lib/supabase';

export const useAssetEdit = (id: string) => {
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    setLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProject(data);
            } catch (err: any) {
                console.error('Error fetching project:', err);
                setError(err.message || 'Failed to fetch project');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id]);

    const handleSave = async () => {
        if (!project) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('projects')
                .update({
                    name: project.name,
                    slug: project.slug,
                    affiliate_link: project.affiliate_link,
                    review_title: project.review_title,
                    review_verdict: project.review_verdict,
                    review_description: project.review_description,
                    review_features: project.review_features,
                    last_updated: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;
            router.push('/dashboard/assets');
        } catch (err: any) {
            console.error('Error updating project:', err);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const updateProjectField = (field: keyof Project, value: any) => {
        if (!project) return;
        setProject({ ...project, [field]: value });
    };

    return { project, loading, saving, error, handleSave, updateProjectField };
};
