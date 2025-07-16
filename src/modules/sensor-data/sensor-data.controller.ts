import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiSecurity } from '@nestjs/swagger';
import { InfraAuthGuard } from '@shared/guards';
import { SensorDataGetDTO } from './dto';
import { SensorDataAddDTO } from './dto/add.dto';
import { SensorDataService } from './sensor-data.service';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post('/')
  @ApiBody({ type: SensorDataGetDTO })
  async getData(@Body() dto: SensorDataGetDTO) {
    return this.sensorDataService.get(dto);
  }

  @Post('/add')
  @UseGuards(InfraAuthGuard)
  @ApiBody({ type: SensorDataAddDTO })
  @ApiSecurity('infra')
  async addData(@Body() dto: SensorDataAddDTO) {
    return this.sensorDataService.create(dto);
  }
}
