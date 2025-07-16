import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class SensorDataAddDTO {
  @ApiProperty({ type: 'number' })
  @IsNumber()
  edgeId: number;

  @ApiProperty({ type: 'string', example: 'DC_out_100ms[140]' })
  @IsString()
  tag: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  timestamp: Date;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  value: number;
}
