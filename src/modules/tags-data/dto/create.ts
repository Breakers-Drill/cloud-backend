import { ApiProperty } from '@nestjs/swagger';
import { VALID_TYPES } from '@shared/constants/sensor-data';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTagDataDto {
  @ApiProperty({
    example: 'DC_out_100ms[144]',
    description: 'Уникальный идентификатор тега',
    required: true,
  })
  @IsString()
  tag: string;

  @ApiProperty({
    example: 'Температура двигателя',
    description: 'Человеко-читаемое название тега',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '°C',
    description: 'Тип/единица измерения тега',
    enum: VALID_TYPES,
    required: true,
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: 0,
    description: 'Минимальное допустимое значение для тега',
    required: true,
  })
  @IsNumber()
  minValue: number;

  @ApiProperty({
    example: 100,
    description: 'Максимальное допустимое значение для тега',
    required: true,
  })
  @IsNumber()
  maxValue: number;

  @ApiProperty({
    example: 1,
    description: 'Множитель значения тега',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  multiplier?: number;

  @ApiProperty({
    example: 'Комментарий к тегу',
    description: 'Комментарий',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
