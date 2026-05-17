// Authentication API service
import apiClient, { ApiResponse } from './client';
import { User } from '../../stores/authStore';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  // Register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
    return response.data.data;
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>('/auth/profile', data);
    return response.data.data;
  },

  // Change password
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await apiClient.post('/auth/change-password', { oldPassword, newPassword });
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};

// Made with Bob
