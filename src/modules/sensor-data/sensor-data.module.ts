import { Module } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorDataController } from './sensor-data.controller';

@Module({
  controllers: [SensorDataController],
  providers: [SensorDataService],
})
export class SensorDataModule {}
