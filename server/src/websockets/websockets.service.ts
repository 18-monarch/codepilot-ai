import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class WebsocketsService {
  constructor(private readonly prisma: PrismaService) {}
}

// Made with Bob
