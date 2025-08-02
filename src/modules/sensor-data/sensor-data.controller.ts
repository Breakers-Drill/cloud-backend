import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { SensorDataGetDTO } from './dto';
import { SensorDataService } from './sensor-data.service';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post('/')
  @ApiBody({ type: SensorDataGetDTO })
  async getData(@Body() dto: SensorDataGetDTO) {
    return this.sensorDataService.get(dto);
  }

  // @Post('/add')
  // @ApiSecurity('infra')
  // @UseGuards(InfraAuthGuard)
  // @ApiBody({ type: SensorDataAddDTO })
  // async addData(@Body() dto: SensorDataAddDTO) {
  //   return this.sensorDataService.create(dto);
  // }
}
