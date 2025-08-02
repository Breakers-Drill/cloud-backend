import { ApiProperty } from '@nestjs/swagger';
import { TAGS_MAP } from '@shared/constants/sensor-data';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

class SensorDataAddData {
  @ApiProperty({ type: 'number' })
  @IsNumber()
  edgeId: number;

  @ApiProperty({ type: 'string', example: 'DC_out_100ms[144]' })
  @Transform(transformTag)
  @IsString()
  tag: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  timestamp: Date;

  @Transform(transformValue)
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

function transformTag(key: TransformFnParams): string | undefined {
  const data = TAGS_MAP.get(key.value);
  if (!data) return undefined;
  return data.name;
}

function transformValue(key: TransformFnParams): number | undefined {
  const data = TAGS_MAP.get(key.obj.tag);
  if (!data) return undefined;
  if (key.value > data.valueRange.max || key.value < data.valueRange.min) return undefined;
  return key.value;
}
