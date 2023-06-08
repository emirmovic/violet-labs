// vendors
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// feature
import { AppController } from './app.controller';
import { config } from './config';
import { DatabaseConnectionService } from './db-connection.service';
import { QuoteEntity } from './+entity/quote.entity';
import { CharactersController } from './controllers/character.controller';
import { QuoteController } from './controllers/quote.controller';
// modules

import { RepositoryService } from './repository.service';
import { QuoteSeedingService } from './seeds/quotes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConnectionService,
    }),
    TypeOrmModule.forFeature([QuoteEntity]),
  ],
  controllers: [AppController, QuoteController, CharactersController],
  providers: [RepositoryService, QuoteSeedingService],
})
export class AppModule {
  constructor(private readonly seedingService: QuoteSeedingService) {}

  async onModuleInit(): Promise<void> {
    await this.seedingService.seed();
  }
}
