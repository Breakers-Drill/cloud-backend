import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EdgeGetDTO } from '../dto/edge-get.dto';

@Injectable()
export class EdgeService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: EdgeGetDTO) {
    const { key, name } = options;

    const data = await this.prisma.edge.findMany({
      where: {
        key: key,
        name: name,
      },
      orderBy: {
        name: 'asc',
      },
      // Здесь можно добавить take, если необходимо
    });

    return data;
  }
}