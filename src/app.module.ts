import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CountriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
