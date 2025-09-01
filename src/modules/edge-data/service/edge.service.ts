import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EdgeGetDTO } from '../dto/edge-get.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EdgeService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: EdgeGetDTO = {}) {
    const { key, name } = options;

    const where: Prisma.EdgeWhereInput = {};

    if (key) {
      where.key = key;
    }

    if (name) {
      where.name = name;
    }

    const data = await this.prisma.edge.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });

    return data;
  }
}