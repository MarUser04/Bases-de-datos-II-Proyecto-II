import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public level: number;
}
