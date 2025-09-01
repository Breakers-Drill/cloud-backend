import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { EdgeBlocksGetDTO } from '../dto/edges-blocks-get.dto';
import { EdgeBlockService } from '../service/edge-block.service';

@Controller('edge-blocks')
export class EdgeBlockController {
  constructor(private readonly edgeBlockService: EdgeBlockService) {}

  @Post('/')
  @ApiBody({ type: EdgeBlocksGetDTO })
  async getBlocks(@Body() dto: EdgeBlocksGetDTO) {
    return this.edgeBlockService.get(dto);
  }
}