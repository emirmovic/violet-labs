import { Repository } from 'typeorm';
import { IQuote } from '@violet-labs/domain';
import { QuoteEntity } from './+entity/quote.entity';
export declare class RepositoryService {
    private repository;
    constructor(repository: Repository<QuoteEntity>);
    getRandomQuote(characters?: Array<string>): Promise<IQuote>;
    getCharacters(): Promise<Array<string>>;
}
