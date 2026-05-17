import { Module } from '@nestjs/common';
import { DebugController } from './debug.controller';
import { DebugService } from './debug.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DebugController],
  providers: [DebugService],
  exports: [DebugService],
})
export class DebugModule {}

// Made with Bob
