import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { CountriesModule } from './countries/countries.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CountriesModule,
    PlayersModule,
  ],
})
export class AppModule {}
