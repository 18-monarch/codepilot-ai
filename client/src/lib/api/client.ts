// Axios API client with interceptors for authentication and error handling
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '../../config/env';

// API response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
let accessToken: string | null = null;
let refreshToken: string | null = null;
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};

export const getAccessToken = () => {
  if (!accessToken) {
    accessToken = localStorage.getItem('accessToken');
  }
  return accessToken;
};

export const getRefreshToken = () => {
  if (!refreshToken) {
    refreshToken = localStorage.getItem('refreshToken');
  }
  return refreshToken;
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Request interceptor - attach access token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh = getRefreshToken();

      if (!refresh) {
        clearTokens();
        window.location.href = '/';
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh token
        const response = await axios.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
          `${env.apiUrl}/auth/refresh`,
          { refreshToken: refresh }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
        setTokens(newAccessToken, newRefreshToken);

        // Update original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        processQueue();
        isRefreshing = false;

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;
        clearTokens();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// Made with Bob
