import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { SensorDataModule } from './modules/sensor-data/sensor-data.module';
import { ThresholdsModule } from './modules/thresholds/thresholds.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    HealthCheckModule,
    SensorDataModule,
    ThresholdsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
