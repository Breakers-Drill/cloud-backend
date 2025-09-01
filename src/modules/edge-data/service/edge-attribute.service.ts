import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EdgeAttributesGetDTO } from '../dto/edges-attributes-get.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EdgeAttributeService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: EdgeAttributesGetDTO = {}) {
    const { edge_key } = options;

    const where: Prisma.EdgeAttributeWhereInput = {};

    if ( edge_key ) {
      where.edge_key = edge_key;
    }

    const data = await this.prisma.edgeAttribute.findMany({
      where,
      orderBy: {
        id: 'asc', // Сортируем по id, так как он является последовательным
      },
    });

    return data;
  }
}