import { Module } from '@nestjs/common';
import { EdgeController } from '../controller/edge.controller';
import { EdgeService } from '../service/edge.service';

@Module({
  controllers: [EdgeController],
  providers: [EdgeService],
  exports: [EdgeService],
})
export class EdgeModule {}