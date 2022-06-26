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
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('countries')
@ApiTags('Countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  async create(@Body(ValidationPipe) createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Post('orm')
  async createORM(@Body(ValidationPipe) createCountryDto: CreateCountryDto) {
    return this.countriesService.createORM(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.update(+id, updateCountryDto);
  }

  @Patch(':id/orm')
  updateORM(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.updateORM(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countriesService.remove(+id);
  }
}
