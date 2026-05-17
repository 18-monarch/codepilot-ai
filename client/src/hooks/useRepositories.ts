// Repository hooks using React Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { repositoriesApi, AnalyzeRepositoryRequest } from '../lib/api/repositories.api';
import { toast } from 'sonner';

// Query keys
export const repositoryKeys = {
  all: ['repositories'] as const,
  detail: (id: string) => ['repositories', id] as const,
  analysis: (id: string) => ['repositories', id, 'analysis'] as const,
};

// Get all repositories
export function useRepositories() {
  return useQuery({
    queryKey: repositoryKeys.all,
    queryFn: repositoriesApi.getRepositories,
  });
}

// Get repository by ID
export function useRepository(id: string) {
  return useQuery({
    queryKey: repositoryKeys.detail(id),
    queryFn: () => repositoriesApi.getRepositoryById(id),
    enabled: !!id,
  });
}

// Get repository analysis
export function useRepositoryAnalysis(repositoryId: string) {
  return useQuery({
    queryKey: repositoryKeys.analysis(repositoryId),
    queryFn: () => repositoriesApi.getRepositoryAnalysis(repositoryId),
    enabled: !!repositoryId,
  });
}

// Analyze repository mutation
export function useAnalyzeRepository() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AnalyzeRepositoryRequest) => repositoriesApi.analyzeRepository(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: repositoryKeys.all });
      queryClient.setQueryData(repositoryKeys.analysis(data.repositoryId), data);
      toast.success('Repository analyzed successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to analyze repository');
    },
  });
}

// Delete repository mutation
export function useDeleteRepository() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => repositoriesApi.deleteRepository(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repositoryKeys.all });
      toast.success('Repository deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete repository');
    },
  });
}

// Made with Bob
