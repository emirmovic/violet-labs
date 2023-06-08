import { BaseEntity } from 'typeorm';
export declare class QuoteEntity extends BaseEntity {
    id: number;
    quote: string;
    character: string;
}
