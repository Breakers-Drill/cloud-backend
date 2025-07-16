import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health-check')
export class HealthCheckController {
  constructor() {}

  @Get('/')
  healthCheck(@Res() response: Response) {
    return response.status(200).send();
  }
}
