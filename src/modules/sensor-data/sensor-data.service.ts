import envConfig from '@config/env.config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    return await this.prisma.sensorData
      .create({
        data: {
          edgeId: dto.edgeId,
          tag: dto.tag,
          timestamp: dto.timestamp,
          value: dto.value,
        },
      })
      .catch(() => {
        throw new BadRequestException('Ошибка добавления данных');
      });
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
