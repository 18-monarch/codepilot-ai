import { Controller } from '@nestjs/common';
import { AIServicesService } from './ai-services.service';

@Controller('ai-services')
export class AIServicesController {
  constructor(private readonly aiServicesService: AIServicesService) {}
}

// Made with Bob
