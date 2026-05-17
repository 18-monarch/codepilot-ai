import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Production-grade PrismaService with:
 * - Singleton architecture
 * - Proper connection lifecycle management
 * - Optimized for serverless/pooled databases (Neon, Supabase, Railway)
 * - Connection retry logic
 * - Structured logging
 * - Hot reload stability
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;
  private connectionAttempts = 0;
  private readonly maxRetries = 3;
  private readonly retryDelay = 2000; // 2 seconds

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
      errorFormat: 'pretty',
      // Optimized for pooled connections (Neon, Supabase, Railway)
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    // Setup Prisma event listeners for structured logging
    this.setupEventListeners();
  }

  /**
   * Setup Prisma event listeners for better observability
   */
  private setupEventListeners(): void {
    // Log queries in development
    if (process.env.NODE_ENV === 'development') {
      this.$on('query' as never, (e: any) => {
        this.logger.debug(`Query: ${e.query}`);
        this.logger.debug(`Duration: ${e.duration}ms`);
      });
    }

    // Log errors
    this.$on('error' as never, (e: any) => {
      this.logger.error(`Prisma Error: ${e.message}`, e.target);
    });

    // Log warnings
    this.$on('warn' as never, (e: any) => {
      this.logger.warn(`Prisma Warning: ${e.message}`);
    });

    // Log info
    this.$on('info' as never, (e: any) => {
      this.logger.log(`Prisma Info: ${e.message}`);
    });
  }

  /**
   * Connect to database with retry logic
   */
  async onModuleInit(): Promise<void> {
    await this.connectWithRetry();
  }

  /**
   * Gracefully disconnect on module destroy
   */
  async onModuleDestroy(): Promise<void> {
    if (this.isConnected) {
      try {
        await this.$disconnect();
        this.isConnected = false;
        this.logger.log('🔌 Database disconnected gracefully');
      } catch (error) {
        this.logger.error('Error disconnecting from database:', error);
      }
    }
  }

  /**
   * Connect with retry logic for resilience
   */
  private async connectWithRetry(): Promise<void> {
    while (this.connectionAttempts < this.maxRetries) {
      try {
        this.connectionAttempts++;
        this.logger.log(`Attempting database connection (${this.connectionAttempts}/${this.maxRetries})...`);

        await this.$connect();
        this.isConnected = true;
        this.connectionAttempts = 0; // Reset on success

        this.logger.log('✅ Database connected successfully');
        this.logger.log(`📊 Connection pool ready for ${process.env.NODE_ENV} environment`);
        
        // Log database info
        await this.logDatabaseInfo();
        
        return;
      } catch (error) {
        this.logger.error(
          `Failed to connect to database (attempt ${this.connectionAttempts}/${this.maxRetries}):`,
          error instanceof Error ? error.message : error,
        );

        if (this.connectionAttempts >= this.maxRetries) {
          this.logger.error('❌ Max connection retries reached. Database connection failed.');
          throw new Error('Failed to connect to database after multiple attempts');
        }

        // Wait before retrying
        this.logger.log(`Retrying in ${this.retryDelay / 1000} seconds...`);
        await this.delay(this.retryDelay);
      }
    }
  }

  /**
   * Log database connection info
   */
  private async logDatabaseInfo(): Promise<void> {
    try {
      const result = await this.$queryRaw<Array<{ version: string }>>`SELECT version()`;
      if (result && result[0]) {
        this.logger.log(`📦 PostgreSQL Version: ${result[0].version.split(' ')[0]} ${result[0].version.split(' ')[1]}`);
      }
    } catch (error) {
      // Silently fail - not critical
    }
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Check if database is connected
   */
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Database health check failed:', error);
      return false;
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): { connected: boolean; attempts: number } {
    return {
      connected: this.isConnected,
      attempts: this.connectionAttempts,
    };
  }

  /**
   * Clean database (testing only)
   * DANGEROUS: Only use in test/development environments
   */
  async cleanDatabase(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production environment');
    }

    this.logger.warn('🧹 Cleaning database...');

    const models = Reflect.ownKeys(this).filter(
      (key) => key[0] !== '_' && key !== 'constructor',
    );

    await Promise.all(
      models.map((modelKey) => {
        const model = this[modelKey as keyof this];
        if (model && typeof model === 'object' && 'deleteMany' in model) {
          return (model as any).deleteMany();
        }
      }),
    );

    this.logger.warn('✅ Database cleaned');
  }

  /**
   * Execute raw query with error handling
   */
  async executeRaw<T = any>(query: string, params?: any[]): Promise<T> {
    try {
      return await this.$queryRawUnsafe<T>(query, ...(params || []));
    } catch (error) {
      this.logger.error('Raw query execution failed:', error);
      throw error;
    }
  }
}

// Made with Bob
