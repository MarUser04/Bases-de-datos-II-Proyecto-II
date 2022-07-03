import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlayersService } from './players.service';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
@ApiTags('Players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Post('orm')
  createORM(@Body(ValidationPipe) createPlayerDto: CreatePlayerDto) {
    return this.playersService.createORM(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get('/orm')
  findAllORM() {
    return this.playersService.findAllORM();
  }

  @Get('/by-countries')
  groupByCountries() {
    return this.playersService.groupByCountries();
  }

  @Get('/by-countries/orm')
  groupByCountriesORM() {
    return this.playersService.groupByCountriesORM();
  }

  @Get('/gender')
  groupByGender() {
    return this.playersService.groupByGender();
  }

  @Get('/gender/orm')
  groupByGenderORM() {
    return this.playersService.groupByGenderORM();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Patch(':id/orm')
  updateORM(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.updateORM(+id, updatePlayerDto);
  }
}
