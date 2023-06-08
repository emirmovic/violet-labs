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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const config_2 = require("./config");
const db_connection_service_1 = require("./db-connection.service");
const quote_entity_1 = require("./+entity/quote.entity");
const character_controller_1 = require("./controllers/character.controller");
const quote_controller_1 = require("./controllers/quote.controller");
const repository_service_1 = require("./repository.service");
const quotes_1 = require("./seeds/quotes");
let AppModule = class AppModule {
    constructor(seedingService) {
        this.seedingService = seedingService;
    }
    async onModuleInit() {
        await this.seedingService.seed();
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.config],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: db_connection_service_1.DatabaseConnectionService,
            }),
            typeorm_1.TypeOrmModule.forFeature([quote_entity_1.QuoteEntity]),
        ],
        controllers: [app_controller_1.AppController, quote_controller_1.QuoteController, character_controller_1.CharactersController],
        providers: [repository_service_1.RepositoryService, quotes_1.QuoteSeedingService],
    }),
    __metadata("design:paramtypes", [quotes_1.QuoteSeedingService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map