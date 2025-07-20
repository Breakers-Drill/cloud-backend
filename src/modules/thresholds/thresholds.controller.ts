import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { InfraAuthGuard } from '@shared/guards';
import { ThresholdsCreateDTO, ThresholdsUpdateDTO } from './dto';
import { ThresholdsService } from './thresholds.service';

@Controller('thresholds')
export class ThresholdsController {
  constructor(private readonly thresholdsService: ThresholdsService) {}

  @Get('/')
  getAll() {
    return this.thresholdsService.getAll();
  }

  @Post('/')
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @ApiBody({ type: ThresholdsCreateDTO })
  async create(@Body() dto: ThresholdsCreateDTO) {
    return this.thresholdsService.create({
      tag: dto.tag,
      min: dto.min || null,
      max: dto.max || null,
    });
  }

  @Patch('/')
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @ApiBody({ type: ThresholdsUpdateDTO })
  @ApiOperation({ description: 'Обновление происходит по уникальному tag' })
  async update(@Body() dto: ThresholdsUpdateDTO) {
    return this.thresholdsService.update({ tag: dto.tag }, { min: dto.min, max: dto.max });
  }
}
