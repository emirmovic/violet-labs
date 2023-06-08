"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quote_entity_1 = require("./+entity/quote.entity");
let RepositoryService = class RepositoryService {
    constructor(repository) {
        this.repository = repository;
    }
    async getRandomQuote(characters) {
        const query = this.repository
            .createQueryBuilder()
            .select()
            .orderBy('RANDOM()');
        if (characters) {
            const nonCapitalizedCharacters = characters.map((character) => character.toLowerCase());
            const capitalizedCharacters = characters.map((character) => character.charAt(0).toUpperCase() + character.slice(1));
            query.where('character IN(:...nonCapitalizedCharacters)', { nonCapitalizedCharacters }).orWhere('character IN(:...capitalizedCharacters)', { capitalizedCharacters });
        }
        const entity = await query.getOne();
        this.repository.remove(entity);
        const { quote, character } = entity;
        return { quote, character };
    }
    async getCharacters() {
        const entities = await this.repository
            .createQueryBuilder()
            .select()
            .groupBy('character')
            .orderBy('character')
            .getMany();
        if (!entities) {
            return;
        }
        return [
            ...new Set(entities.map(({ character }) => character.toLowerCase())),
        ];
    }
};
RepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quote_entity_1.QuoteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RepositoryService);
exports.RepositoryService = RepositoryService;
//# sourceMappingURL=repository.service.js.map