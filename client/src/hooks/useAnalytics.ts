// Analytics hooks using React Query
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../lib/api/analytics.api';

// Query keys
export const analyticsKeys = {
  all: ['analytics'] as const,
  weekly: ['analytics', 'weekly'] as const,
};

// Get analytics data
export function useAnalytics() {
  return useQuery({
    queryKey: analyticsKeys.all,
    queryFn: analyticsApi.getAnalytics,
  });
}

// Get weekly activity
export function useWeeklyActivity() {
  return useQuery({
    queryKey: analyticsKeys.weekly,
    queryFn: analyticsApi.getWeeklyActivity,
  });
}

// Made with Bob
