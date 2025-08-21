import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTagDataDto {
  @ApiProperty({ example: 'DC_out_100ms[144]', required: false })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({ example: 'Температура двигателя', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '°C', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  minValue?: number;

  @ApiProperty({ example: 100, required: false })
  @IsNumber()
  @IsOptional()
  maxValue?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  multiplier?: number;

  @ApiProperty({ example: 'Комментарий', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}

