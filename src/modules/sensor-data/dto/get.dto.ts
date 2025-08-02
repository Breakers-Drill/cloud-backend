import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EDateInterval } from 'src/shared/types/sensor-data.types';

class DateInterval {
  @ApiProperty()
  @IsDate()
  start: Date;

  @ApiProperty()
  @IsDate()
  end: Date;
}

export class SensorDataGetDTO {
  @ApiProperty({ required: false, type: 'string', example: 'DC_out_100ms[140]' })
  @IsString()
  @IsOptional()
  tag: string | undefined;

  @ApiProperty({ required: false, type: DateInterval })
  @IsOptional()
  @ValidateNested()
  dateInterval: DateInterval | undefined;

  @ApiProperty({ type: 'string', example: 'hour', examples: ['5min', 'h', '2h'], required: false })
  @IsOptional()
  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(EDateInterval)
  interval: EDateInterval | undefined;
}
