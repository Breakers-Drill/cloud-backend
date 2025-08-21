import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateTagDataDto } from './create';

export class CreateManyTagDataDto {
  @ApiProperty({ type: [CreateTagDataDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDataDto)
  items: CreateTagDataDto[];
}

