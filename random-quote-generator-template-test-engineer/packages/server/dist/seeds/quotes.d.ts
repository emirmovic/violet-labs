import { Repository } from 'typeorm';
import { QuoteEntity } from '~/+entity/quote.entity';
export declare class QuoteSeedingService {
    private quoteRepository;
    constructor(quoteRepository: Repository<QuoteEntity>);
    seed(): Promise<void>;
}
