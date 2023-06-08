import { RepositoryService } from '../repository.service';
export declare class CharactersController {
    private readonly service;
    constructor(service: RepositoryService);
    getCharacters(): Promise<Array<string>>;
}
