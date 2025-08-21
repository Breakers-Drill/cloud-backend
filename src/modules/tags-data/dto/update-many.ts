import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateTagDataManyItemDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

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
}

export class UpdateManyTagDataDto {
  @ApiProperty({ type: [UpdateTagDataManyItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTagDataManyItemDto)
  items: UpdateTagDataManyItemDto[];
}

