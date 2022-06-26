import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { EntityManager, Repository } from 'typeorm';

import { Country } from '../entities/country.entity';

import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  private logger = new Logger(CountriesService.name);

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectEntityManager('default') private entityManager: EntityManager,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    const { name } = createCountryDto;

    try {
      const query = `INSERT INTO countries(name) VALUES ('${name}');`;

      await this.entityManager.query(query);

      return createCountryDto;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async createORM(createCountryDto: CreateCountryDto) {
    const { name } = createCountryDto;

    try {
      const country = await this.countryRepository.insert({ name });

      return country;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all countries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const { name } = updateCountryDto;

    try {
      const query = `UPDATE countries SET name = '${name}' WHERE id = ${id}`;

      await this.entityManager.query(query);

      return updateCountryDto;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async updateORM(id: number, updateCountryDto: UpdateCountryDto) {
    const { name } = updateCountryDto;

    try {
      const country = await this.countryRepository.update({ id }, { name });

      return country;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
