import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCountryDto } from '../countries/dto/create-country.dto';

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body(ValidationPipe) createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Post('orm')
  async createORM(@Body(ValidationPipe) createItemDto: CreateItemDto) {
    return this.itemsService.createORM(createItemDto);
  }
}
