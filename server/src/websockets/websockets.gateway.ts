import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebsocketsService } from './websockets.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly websocketsService: WebsocketsService) {}
}

// Made with Bob
