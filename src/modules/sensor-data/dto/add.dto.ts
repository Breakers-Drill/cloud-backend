import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

class SensorDataAddData {
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

export class SensorDataAddDTO {
  @IsArray()
  @Type(() => SensorDataAddData)
  @ValidateNested({ each: true })
  @ApiProperty({ type: SensorDataAddData, isArray: true })
  data: SensorDataAddData[];
}
