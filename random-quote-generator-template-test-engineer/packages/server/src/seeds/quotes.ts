import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuoteEntity } from '~/+entity/quote.entity';
import quotesJSON from './office_quotes.json';

@Injectable()
export class QuoteSeedingService {
  constructor(
    @InjectRepository(QuoteEntity)
    private quoteRepository: Repository<QuoteEntity>,
  ) {}

  async seed(): Promise<void> {
    await Promise.all(
      quotesJSON.map(({ quote, character }) =>
        this.quoteRepository.save({ quote, character }),
      ),
    );
  }
}
