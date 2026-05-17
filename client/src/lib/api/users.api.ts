// Users API service
import apiClient, { ApiResponse } from './client';
import { User } from '../../stores/authStore';

export interface UserStats {
  repositoriesAnalyzed: number;
  documentationGenerated: number;
  bugsFixed: number;
  timeSaved: string;
}

export interface UserActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
}

export const usersApi = {
  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    return response.data.data;
  },

  // Get user stats
  getUserStats: async (): Promise<UserStats> => {
    const response = await apiClient.get<ApiResponse<UserStats>>('/users/me/stats');
    return response.data.data;
  },

  // Get user activities
  getUserActivities: async (): Promise<UserActivity[]> => {
    const response = await apiClient.get<ApiResponse<UserActivity[]>>('/users/me/activities');
    return response.data.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};

// Made with Bob
