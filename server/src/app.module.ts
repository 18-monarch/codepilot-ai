import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

// Database
import { DatabaseModule } from './database/database.module';

// Feature Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { AIServicesModule } from './ai-services/ai-services.module';
import { DocumentationModule } from './documentation/documentation.module';
import { TestsModule } from './tests/tests.module';
import { DebugModule } from './debug/debug.module';
import { RefactorModule } from './refactor/refactor.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UploadsModule } from './uploads/uploads.module';
import { WebsocketsModule } from './websockets/websockets.module';

// Common
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 100, // 100 requests per minute
      },
    ]),

    // Scheduling
    ScheduleModule.forRoot(),

    // Database
    DatabaseModule,

    // Feature modules
    AuthModule,
    UsersModule,
    RepositoriesModule,
    AIServicesModule,
    DocumentationModule,
    TestsModule,
    DebugModule,
    RefactorModule,
    OnboardingModule,
    AnalyticsModule,
    NotificationsModule,
    UploadsModule,
    WebsocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Made with Bob
