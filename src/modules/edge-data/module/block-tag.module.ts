import { Module } from '@nestjs/common';
import { BlockTagController } from '../controller/block-tag.controller';
import { BlockTagService } from '../service/block-tag.service';

@Module({
  controllers: [BlockTagController],
  providers: [BlockTagService],
  exports: [BlockTagService],
})
export class BlockTagModule {}