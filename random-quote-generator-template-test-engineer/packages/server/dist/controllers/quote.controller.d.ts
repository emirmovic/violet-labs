import { IQuote } from '@violet-labs/domain';
import { RepositoryService } from '../repository.service';
export declare class QuoteController {
    private readonly service;
    constructor(service: RepositoryService);
    getQuote(query?: any): Promise<IQuote>;
}
