import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { EntityManager, Repository } from 'typeorm';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from '../entities/player.entity';
import { Country } from '../entities/country.entity';

@Injectable()
export class PlayersService {
  private logger = new Logger(PlayersService.name);

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectEntityManager('default')
    private readonly entityManager: EntityManager,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const { name, birthdate, country, gender } = createPlayerDto;

    try {
      const query = `
        INSERT INTO players(name, birthdate, gender, id_country) 
        VALUES ('${name}', '${birthdate}', '${gender}', ${country});
      `;

      await this.entityManager.query(query);

      return createPlayerDto;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async createORM(createPlayerDto: CreatePlayerDto) {
    const { name, birthdate, country: countryId, gender } = createPlayerDto;

    let country;
    try {
      country = await this.countryRepository.findOneBy({ id: countryId });
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }

    if (!country) {
      throw new NotFoundException();
    }

    try {
      const player = await this.playerRepository.insert({
        name,
        birthdate,
        gender,
        country,
      });

      return player;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all players`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}