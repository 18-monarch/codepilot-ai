// Environment configuration
export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Made with Bob
