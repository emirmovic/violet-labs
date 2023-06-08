// vendors
import { Controller, Get, Query } from '@nestjs/common';
// libs
import { IQuote } from '@violet-labs/domain';

import { RepositoryService } from '../repository.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly service: RepositoryService) {}

  @Get()
  async getQuote(@Query() query?): Promise<IQuote> {
    const { characters } = query || {};
    return await this.service.getRandomQuote(
      characters ? characters.split(',') : null
    );
  }
}
