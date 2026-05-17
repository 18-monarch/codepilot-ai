import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}

// Made with Bob
