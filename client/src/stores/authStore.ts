// Zustand store for authentication state management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokens, clearTokens, getAccessToken, getRefreshToken } from '../lib/api/client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  avatar?: string;
  bio?: string;
  githubUsername?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => 
        set({ 
          user, 
          isAuthenticated: !!user 
        }),

      setAuth: (user, accessToken, refreshToken) => {
        setTokens(accessToken, refreshToken);
        set({ 
          user, 
          isAuthenticated: true,
          isLoading: false 
        });
      },

      logout: () => {
        clearTokens();
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false 
        });
      },

      setLoading: (loading) => 
        set({ isLoading: loading }),

      restoreSession: async () => {
        const token = getAccessToken();
        const refresh = getRefreshToken();
        
        if (token && refresh) {
          // Tokens exist, mark as authenticated and let profile fetch validate
          set({
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Made with Bob
