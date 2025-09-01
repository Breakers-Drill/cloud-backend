import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EdgeAttributesGetDTO {
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
    example: 'closed',
    description: 'The state of the bypass'
  })
  @IsString()
  @IsOptional()
  bypass_state?: string;
}