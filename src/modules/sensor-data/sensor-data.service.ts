import envConfig from '@config/env.config';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { SensorDataGetDTO } from './dto';
import SensorDataUtils from './utils';

@Injectable()
export class SensorDataService {
  utils: SensorDataUtils;

  constructor(private readonly prisma: PrismaService) {
    this.utils = new SensorDataUtils();
  }

  async createMany(data: Prisma.SensorDataCreateInput[]) {
    return await this.prisma.sensorData.createMany({ data: data }).catch(() => {
      return null;
    });
  }

  async createOne(data: Prisma.SensorDataCreateInput) {
    return await this.prisma.sensorData.create({ data: data }).catch(() => {
      return null;
    });
  }

  async get(options: SensorDataGetDTO) {
    const { dateInterval, tag, interval } = options;

    const timestamp: Prisma.DateTimeFilter | undefined =
      dateInterval == undefined
        ? undefined
        : {
            lte: dateInterval.end,
            gte: dateInterval.start,
          };

    const take = interval ? undefined : envConfig.SENSOR_DATA_GET_LIMIT;

    const data = await this.prisma.sensorData.findMany({
      where: {
        tag: tag,
        timestamp: timestamp,
      },
      take,
    });

    if (interval) {
      return this.utils.filterDataByInterval(data, interval);
    }

    return data;
  }
}
