// User hooks using React Query
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../lib/api/users.api';

// Query keys
export const userKeys = {
  current: ['users', 'current'] as const,
  stats: ['users', 'stats'] as const,
  activities: ['users', 'activities'] as const,
  detail: (id: string) => ['users', id] as const,
};

// Get current user
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.current,
    queryFn: usersApi.getCurrentUser,
  });
}

// Get user stats
export function useUserStats() {
  return useQuery({
    queryKey: userKeys.stats,
    queryFn: usersApi.getUserStats,
  });
}

// Get user activities
export function useUserActivities() {
  return useQuery({
    queryKey: userKeys.activities,
    queryFn: usersApi.getUserActivities,
  });
}

// Get user by ID
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
}

// Made with Bob
