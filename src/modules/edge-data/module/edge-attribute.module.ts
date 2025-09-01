import { Module } from '@nestjs/common';
import { EdgeAttributeController } from '../controller/edge-attribute.controller';
import { EdgeAttributeService } from '../service/edge-attribute.service';

@Module({
  controllers: [EdgeAttributeController],
  providers: [EdgeAttributeService],
  exports: [EdgeAttributeService],
})
export class EdgeAttributeModule {}