import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BlockTagsGetDTO {
  @ApiProperty({
    required: false,
    type: 'string',
    example: 'temperature_sensor',
    description: 'The unique tag name'
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'd_123456',
    description: 'The unique key of the associated edge'
  })
  @IsString()
  @IsOptional()
  edge_key?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'engine_1',
    description: 'The name of the associated block'
  })
  @IsString()
  @IsOptional()
  block_name?: string;
}