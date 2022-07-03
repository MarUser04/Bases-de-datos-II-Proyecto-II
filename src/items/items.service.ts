import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  private logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectEntityManager('default') private entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const { name, level } = createItemDto;

    try {
      const query = `INSERT INTO items(name, level) VALUES('${name}', '${level}')`;

      await this.entityManager.query(query);

      return createItemDto;
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }

  async createORM(createItemDto: CreateItemDto) {
    const { name, level } = createItemDto;

    try {
      return await this.itemRepository.insert({ name, level });
    } catch (e) {
      this.logger.error(e?.message);
      throw new InternalServerErrorException();
    }
  }
}
