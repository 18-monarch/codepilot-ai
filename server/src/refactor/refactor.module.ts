import { Module } from '@nestjs/common';
import { RefactorController } from './refactor.controller';
import { RefactorService } from './refactor.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RefactorController],
  providers: [RefactorService],
  exports: [RefactorService],
})
export class RefactorModule {}

// Made with Bob
