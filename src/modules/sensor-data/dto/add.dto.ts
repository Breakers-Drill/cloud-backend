import { ApiProperty } from '@nestjs/swagger';
import { IsValidTag } from '@shared/validators/isValidTag';
import { IsValidTagValue } from '@shared/validators/isValidTagValue';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class SensorDataAddData {
  @ApiProperty({ type: 'number' })
  @IsNumber()
  edgeId: number;

  @ApiProperty({ type: 'string', example: 'DC_out_100ms[144]' })
  @IsValidTag()
  @IsString()
  tag: string;

  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  timestamp?: Date;

  @IsValidTagValue()
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
