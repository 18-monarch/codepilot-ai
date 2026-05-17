// Analytics API service
import apiClient, { ApiResponse } from './client';

export interface ChartDataPoint {
  name: string;
  analyses: number;
  docs: number;
  tests: number;
}

export interface AnalyticsData {
  weeklyActivity: ChartDataPoint[];
  totalRepositories: number;
  totalDocumentation: number;
  totalTests: number;
  totalBugsFixed: number;
}

export const analyticsApi = {
  // Get analytics data
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await apiClient.get<ApiResponse<AnalyticsData>>('/analytics');
    return response.data.data;
  },

  // Get weekly activity
  getWeeklyActivity: async (): Promise<ChartDataPoint[]> => {
    const response = await apiClient.get<ApiResponse<ChartDataPoint[]>>('/analytics/weekly');
    return response.data.data;
  },
};

// Made with Bob
