import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BlockTagsGetDTO } from '../dto/block-tags-get.dto';
import { BlockTagService } from '../service/block-tag.service';

@Controller('block-tags')
export class BlockTagController {
  constructor(private readonly blockTagService: BlockTagService) {}

  @Get('/')
  @ApiBody({ type: BlockTagsGetDTO })
  async getTags(@Query() dto: BlockTagsGetDTO = {}) {
    return this.blockTagService.get(dto);
  }
}