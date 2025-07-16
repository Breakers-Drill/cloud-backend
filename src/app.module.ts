import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { SensorDataModule } from './modules/sensor-data/sensor-data.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    HealthCheckModule,
    SensorDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
