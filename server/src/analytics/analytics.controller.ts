import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getAnalytics(@Request() req) {
    // Return mock analytics data for now
    const data = {
      weeklyActivity: [
        { name: 'Mon', analyses: 12, docs: 8, tests: 15 },
        { name: 'Tue', analyses: 19, docs: 12, tests: 22 },
        { name: 'Wed', analyses: 15, docs: 10, tests: 18 },
        { name: 'Thu', analyses: 22, docs: 15, tests: 25 },
        { name: 'Fri', analyses: 18, docs: 13, tests: 20 },
        { name: 'Sat', analyses: 8, docs: 5, tests: 10 },
        { name: 'Sun', analyses: 5, docs: 3, tests: 7 },
      ],
      totalRepositories: 24,
      totalDocumentation: 156,
      totalTests: 342,
      totalBugsFixed: 89,
    };

    return {
      data,
      statusCode: 200,
    };
  }

  @Get('weekly')
  async getWeeklyActivity(@Request() req) {
    // Return mock weekly activity data
    const data = [
      { name: 'Mon', analyses: 12, docs: 8, tests: 15 },
      { name: 'Tue', analyses: 19, docs: 12, tests: 22 },
      { name: 'Wed', analyses: 15, docs: 10, tests: 18 },
      { name: 'Thu', analyses: 22, docs: 15, tests: 25 },
      { name: 'Fri', analyses: 18, docs: 13, tests: 20 },
      { name: 'Sat', analyses: 8, docs: 5, tests: 10 },
      { name: 'Sun', analyses: 5, docs: 3, tests: 7 },
    ];

    return {
      data,
      statusCode: 200,
    };
  }
}

// Made with Bob
