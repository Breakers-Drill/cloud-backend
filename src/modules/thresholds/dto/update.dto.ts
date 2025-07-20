import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ThresholdsUpdateDTO {
  @IsString()
  @ApiProperty({ type: 'string' })
  tag: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: 'number', example: '100' })
  min: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: 'number', example: '120' })
  max: number;
}
