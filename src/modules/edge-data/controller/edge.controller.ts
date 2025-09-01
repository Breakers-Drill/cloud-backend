import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { EdgeGetDTO } from '../dto/edge-get.dto';
import { EdgeService } from '../service/edge.service';

@Controller('edges')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  @Get('/')
  @ApiBody({ type: EdgeGetDTO })
  async getEdges(@Query() dto: EdgeGetDTO = {}) {
    return this.edgeService.get(dto);
  }
}