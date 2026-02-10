import { Project, DashboardStats } from '../entities/Project';

export interface IProjectRepository {
    getProjects(userId: string): Promise<Project[]>;
    getDashboardStats(userId: string): Promise<DashboardStats>;
}
