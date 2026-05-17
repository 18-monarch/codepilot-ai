// Repositories API service
import apiClient, { ApiResponse } from './client';
import { Repository } from '../../types';

export interface AnalyzeRepositoryRequest {
  url: string;
}

export interface RepositoryAnalysis {
  id: string;
  repositoryId: string;
  filesAnalyzed: number;
  dependencies: number;
  linesOfCode: number;
  techStack: TechStackItem[];
  architecture: string;
  importantFiles: ImportantFile[];
  createdAt: string;
}

export interface TechStackItem {
  name: string;
  version: string;
  type: 'frontend' | 'backend' | 'database' | 'devops';
}

export interface ImportantFile {
  name: string;
  path: string;
  description: string;
}

export const repositoriesApi = {
  // Get all repositories
  getRepositories: async (): Promise<Repository[]> => {
    const response = await apiClient.get<ApiResponse<Repository[]>>('/repositories');
    return response.data.data;
  },

  // Get repository by ID
  getRepositoryById: async (id: string): Promise<Repository> => {
    const response = await apiClient.get<ApiResponse<Repository>>(`/repositories/${id}`);
    return response.data.data;
  },

  // Analyze repository
  analyzeRepository: async (data: AnalyzeRepositoryRequest): Promise<RepositoryAnalysis> => {
    const response = await apiClient.post<ApiResponse<RepositoryAnalysis>>('/repositories/analyze', data);
    return response.data.data;
  },

  // Get repository analysis
  getRepositoryAnalysis: async (repositoryId: string): Promise<RepositoryAnalysis> => {
    const response = await apiClient.get<ApiResponse<RepositoryAnalysis>>(`/repositories/${repositoryId}/analysis`);
    return response.data.data;
  },

  // Delete repository
  deleteRepository: async (id: string): Promise<void> => {
    await apiClient.delete(`/repositories/${id}`);
  },
};

// Made with Bob
