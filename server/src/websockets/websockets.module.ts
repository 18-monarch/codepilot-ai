import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { WebsocketsService } from './websockets.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [WebsocketsGateway, WebsocketsService],
  exports: [WebsocketsService],
})
export class WebsocketsModule {}

// Made with Bob
