import { Controller } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}
}

// Made with Bob
