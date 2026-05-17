import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth() {
    const dbHealthy = await this.prisma.isHealthy();
    const connectionStatus = this.prisma.getConnectionStatus();

    return {
      status: dbHealthy ? 'ok' : 'degraded',
      message: 'CodePilot AI Workspace API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        connected: connectionStatus.connected,
        healthy: dbHealthy,
        connectionAttempts: connectionStatus.attempts,
      },
    };
  }
}

// Made with Bob
