import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EdgeGetDTO {
  @ApiProperty({
    required: false,
    type: 'string',
    example: 'd_123456',
    description: 'The unique key of the edge'
  })
  @IsString()
  @IsOptional()
  key?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Буровая 123',
    description: 'The name of the edge'
  })
  @IsString()
  @IsOptional()
  name?: string;
}