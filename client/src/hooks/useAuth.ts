// Authentication hooks using React Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, LoginRequest, RegisterRequest } from '../lib/api/auth.api';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'sonner';

// Query keys
export const authKeys = {
  profile: ['auth', 'profile'] as const,
};

// Get current user profile
export function useProfile() {
  const { isAuthenticated } = useAuthStore();
  
  return useQuery({
    queryKey: authKeys.profile,
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
  });
}

// Login mutation
export function useLogin() {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      queryClient.setQueryData(authKeys.profile, data.user);
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
}

// Register mutation
export function useRegister() {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      queryClient.setQueryData(authKeys.profile, data.user);
      toast.success('Registration successful!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
}

// Logout mutation
export function useLogout() {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully');
    },
    onError: () => {
      // Still logout on error
      logout();
      queryClient.clear();
    },
  });
}

// Update profile mutation
export function useUpdateProfile() {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof authApi.updateProfile>[0]) => 
      authApi.updateProfile(data),
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(authKeys.profile, data);
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
}

// Made with Bob
