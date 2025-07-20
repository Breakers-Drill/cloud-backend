import envConfig from '@config/env.config';
import { Injectable } from '@nestjs/common';
import { Prisma, SensorData } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { SensorDataGetDTO } from './dto';
import { SensorDataAddDTO } from './dto/add.dto';
import SensorDataUtils from './utils';

@Injectable()
export class SensorDataService {
  utils: SensorDataUtils;

  constructor(private readonly prisma: PrismaService) {
    this.utils = new SensorDataUtils();
  }

  async create(dto: SensorDataAddDTO) {
    const returnData: SensorData[] = [];
    for (const data of dto.data) {
      const item = await this.prisma.sensorData
        .create({
          data: {
            edgeId: data.edgeId,
            tag: data.tag,
            timestamp: data.timestamp,
            value: data.value,
          },
        })
        .catch(() => {
          return null;
        });
      if (!item) continue;
      returnData.push(item);
    }
    return returnData;
  }

  async get(options: SensorDataGetDTO) {
    const { dateInterval, tag, interval } = options;

    const timestamp: Prisma.DateTimeFilter =
      dateInterval == undefined
        ? {}
        : {
            lte: dateInterval.end,
            gte: dateInterval.start,
          };

    const data = await this.prisma.sensorData.findMany({
      where: {
        tag: tag,
        timestamp: timestamp,
      },
      take: envConfig.SENSOR_DATA_GET_LIMIT,
    });

    if (interval) {
      return this.utils.filterByTimeInterval(data, interval);
    }

    return data;
  }
}
