import { Module } from '@nestjs/common';
import { EdgeBlockController } from '../controller/edge-block.controller';
import { EdgeBlockService } from '../service/edge-block.service';

@Module({
  controllers: [EdgeBlockController],
  providers: [EdgeBlockService],
  exports: [EdgeBlockService],
})
export class EdgeBlockModule {}