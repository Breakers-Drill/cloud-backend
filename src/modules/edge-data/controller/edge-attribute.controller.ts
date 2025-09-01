import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { EdgeAttributesGetDTO } from '../dto/edges-attributes-get.dto';
import { EdgeAttributeService } from '../service/edge-attribute.service';

@Controller('edge-attributes')
export class EdgeAttributeController {
  constructor(private readonly edgeAttributeService: EdgeAttributeService) {}

  @Get('/')
  @ApiBody({ type: EdgeAttributesGetDTO })
  async getAttributes(@Query() dto: EdgeAttributesGetDTO = {}) {
    return this.edgeAttributeService.get(dto);
  }
}