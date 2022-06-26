import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum GenderEnum {
  MALE = 'Male',
  FEMALE = 'Female',
}

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  birthdate: string;

  @IsString()
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  @ApiProperty()
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  country: number;
}
