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

  async findAll() {
    try {
      const query = `
        SELECT p.name as player, p.gender as gender, p.birthdate as birthdate, c.name as country
        FROM players p
        INNER JOIN countries c ON c.id = p.id_country
      `;
      return await this.entityManager.query(query);
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async findAllORM() {
    try {
      const players = await this.playerRepository.find({
        relations: ['country'],
      });

      return players;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const { name, birthdate, country, gender } = updatePlayerDto;

    try {
      const query = `
        UPDATE players SET
        name = '${name}',
        birthdate = '${birthdate}',
        id_country = '${country}',
        gender = '${gender}' 
        WHERE id = ${id};
      `;

      await this.entityManager.query(query);

      return updatePlayerDto;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async updateORM(id: number, updatePlayerDto: UpdatePlayerDto) {
    const { name, birthdate, country: countryId, gender } = updatePlayerDto;

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
      const player = await this.playerRepository.update(
        { id },
        {
          name,
          birthdate,
          gender,
          country,
        },
      );

      return player;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async groupByCountries() {
    try {
      const query = `
        SELECT c.name as country, COUNT(*) as total
        FROM players p
        INNER JOIN countries c ON c.id = p.id_country
        GROUP BY country
        ORDER BY total DESC
      `;
      return await this.entityManager.query(query);
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async groupByCountriesORM() {
    try {
      const countries = await this.countryRepository.find({
        relations: ['players'],
      });

      return countries.map((country) => ({
        ...country,
        players: country.players.length,
      }));
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async groupByGender() {
    try {
      const query = `
        SELECT COUNT(*), gender
        FROM players
        WHERE gender = 'Male'
        GROUP BY gender
      `;
      return await this.entityManager.query(query);
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async groupByGenderORM() {
    try {
      const [, count] = await this.playerRepository.findAndCountBy({
        gender: 'Male',
      });

      return [{ count, gender: 'Male' }];
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }
}
