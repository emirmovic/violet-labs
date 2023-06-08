import { QuoteSeedingService } from './seeds/quotes';
export declare class AppModule {
    private readonly seedingService;
    constructor(seedingService: QuoteSeedingService);
    onModuleInit(): Promise<void>;
}
