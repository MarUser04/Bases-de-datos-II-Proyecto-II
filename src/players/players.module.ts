import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';

import { Player } from '../entities/player.entity';
import { Country } from '../entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Player])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
