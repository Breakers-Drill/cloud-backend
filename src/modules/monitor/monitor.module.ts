import { Module } from '@nestjs/common';
import { SensorDataService } from '../sensor-data/sensor-data.service';
import { MonitorService } from './monitor.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MonitorService, SensorDataService],
})
export class MonitorModule {}
