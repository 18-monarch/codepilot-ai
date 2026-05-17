import { Module } from '@nestjs/common';
import { DocumentationController } from './documentation.controller';
import { DocumentationService } from './documentation.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentationController],
  providers: [DocumentationService],
  exports: [DocumentationService],
})
export class DocumentationModule {}

// Made with Bob
