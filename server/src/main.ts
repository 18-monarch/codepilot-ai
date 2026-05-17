import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  // Enable graceful shutdown hooks for Prisma
  // This ensures proper cleanup of database connections
  app.enableShutdownHooks();

  // Global prefix
  const apiPrefix = configService.get('API_PREFIX') || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS configuration
  const corsOrigin = configService.get('CORS_ORIGIN')?.split(',') || [
    'http://localhost:5173',
    'http://localhost:3000',
  ];

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Setup graceful shutdown
  setupGracefulShutdown(app, prismaService, logger);

  const port = configService.get('PORT') || 3001;
  await app.listen(port);

  logger.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🚀 CodePilot AI Workspace Backend                      ║
  ║                                                           ║
  ║   Server running on: http://localhost:${port}              ║
  ║   API Endpoint: http://localhost:${port}/${apiPrefix}         ║
  ║   Environment: ${configService.get('NODE_ENV')}                      ║
  ║                                                           ║
  ║   Powered by NestJS + Prisma + PostgreSQL                ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
}

/**
 * Setup graceful shutdown handlers
 * Ensures proper cleanup of database connections and resources
 */
function setupGracefulShutdown(
  app: any,
  prismaService: PrismaService,
  logger: Logger,
): void {
  // Handle SIGTERM (e.g., from Docker, Kubernetes)
  process.on('SIGTERM', async () => {
    logger.warn('⚠️  SIGTERM signal received: closing HTTP server');
    await gracefulShutdown(app, prismaService, logger);
  });

  // Handle SIGINT (e.g., Ctrl+C)
  process.on('SIGINT', async () => {
    logger.warn('⚠️  SIGINT signal received: closing HTTP server');
    await gracefulShutdown(app, prismaService, logger);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', async (error) => {
    logger.error('❌ Uncaught Exception:', error);
    await gracefulShutdown(app, prismaService, logger);
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', async (reason, promise) => {
    logger.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    await gracefulShutdown(app, prismaService, logger);
    process.exit(1);
  });
}

/**
 * Perform graceful shutdown
 */
async function gracefulShutdown(
  app: any,
  prismaService: PrismaService,
  logger: Logger,
): Promise<void> {
  try {
    logger.log('🔄 Starting graceful shutdown...');

    // Close HTTP server
    await app.close();
    logger.log('✅ HTTP server closed');

    // Disconnect Prisma (handled by OnModuleDestroy, but ensure it happens)
    await prismaService.$disconnect();
    logger.log('✅ Database connections closed');

    logger.log('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('❌ Failed to start application:', error);
  process.exit(1);
});

// Made with Bob
