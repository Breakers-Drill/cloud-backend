import { Module } from '@nestjs/common';
import { IsValidTagConstraint } from '@shared/validators/isValidTag';
import { IsValidTagValueConstraint } from '@shared/validators/isValidTagValue';
import { PrismaModule } from 'nestjs-prisma';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { SensorDataModule } from './modules/sensor-data/sensor-data.module';
import { TagsDataModule } from './modules/tags-data/tags-data.module';
import { ThresholdsModule } from './modules/thresholds/thresholds.module';
import { MonitorModule } from './modules/monitor/monitor.module';
import { EdgeModule } from './modules/edge-data/module/edge.module';
import { EdgeAttributeModule } from './modules/edge-data/module/edge-attribute.module';
import { EdgeBlockModule } from './modules/edge-data/module/edge-block.module';
import { BlockTagModule } from './modules/edge-data/module/block-tag.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    HealthCheckModule,
    SensorDataModule,
    ThresholdsModule,
    TagsDataModule,
    MonitorModule,
    EdgeModule,
    EdgeAttributeModule,
    EdgeBlockModule,
    BlockTagModule
  ],
  controllers: [],
  providers: [IsValidTagValueConstraint, IsValidTagConstraint],
})
export class AppModule {}
