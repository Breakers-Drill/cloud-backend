import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class DeleteManyTagDataDto {
  @ApiProperty({ type: [Number], description: 'Список ID записей для удаления' })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}

