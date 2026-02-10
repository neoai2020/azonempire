import { IProjectRepository } from '@/src/domain/repositories/IProjectRepository';
import { Project, DashboardStats } from '@/src/domain/entities';
import { supabase } from '@/src/infrastructure/lib/supabase';

export class ProjectService implements IProjectRepository {
    async getProjects(userId: string): Promise<Project[]> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId)
            .order('last_updated', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            throw new Error(error.message);
        }

        return data as Project[];
    }

    async getDashboardStats(userId: string): Promise<DashboardStats> {
        // In a real app, this might be a separate API call or aggregation query.
        // For now, we calculate it from projects as done in the original code,
        // but ideally this logic should be in the service or backend.
        // However, to keep it simple and consistent with the interface, 
        // we might need to fetch projects here too if we don't have a direct stats endpoint.

        // Optimally, we would have a RPC function or separate table for stats.
        // But let's reuse getProjects or just duplicate the fetch for now to satisfy the contract independently.

        try {
            const projects = await this.getProjects(userId);

            return {
                total_assets: projects.length,
                total_views: projects.reduce((acc, p) => acc + (p.views || 0), 0),
                outbound_clicks: projects.reduce((acc, p) => acc + (p.clicks || 0), 0),
                conversion_estimation: projects.reduce((acc, p) => acc + (p.clicks || 0), 0) * 2.5,
            };
        } catch (error) {
            console.error('Error calculating stats:', error);
            throw error;
        }
    }
}
