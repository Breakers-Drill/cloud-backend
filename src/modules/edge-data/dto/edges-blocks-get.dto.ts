import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EdgeBlocksGetDTO {
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
    description: 'The unique name of the block'
  })
  @IsString()
  @IsOptional()
  block_name?: string;
}