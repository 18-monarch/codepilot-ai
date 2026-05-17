import { Module } from '@nestjs/common';
import { AIServicesController } from './ai-services.controller';
import { AIServicesService } from './ai-services.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AIServicesController],
  providers: [AIServicesService],
  exports: [AIServicesService],
})
export class AIServicesModule {}

// Made with Bob
