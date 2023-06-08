// vendors
import { Controller, Get } from '@nestjs/common';

import { RepositoryService } from '../repository.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly service: RepositoryService) {}

  @Get()
  async getCharacters(): Promise<Array<string>> {
    return await this.service.getCharacters();
  }
}
