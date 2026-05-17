import { Controller } from '@nestjs/common';
import { RefactorService } from './refactor.service';

@Controller('refactor')
export class RefactorController {
  constructor(private readonly refactorService: RefactorService) {}
}

// Made with Bob
