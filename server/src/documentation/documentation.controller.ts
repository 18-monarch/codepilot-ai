import { Controller } from '@nestjs/common';
import { DocumentationService } from './documentation.service';

@Controller('documentation')
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) {}
}

// Made with Bob
