// Environment configuration
export const env = {
  apiUrl: import.meta.env.VITE_API_URL?.trim() || 'https://codepilot-ai-5wi2.onrender.com/api/v1',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;