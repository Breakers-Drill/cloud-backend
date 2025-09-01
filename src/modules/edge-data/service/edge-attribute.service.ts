import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EdgeAttributesGetDTO } from '../dto/edges-attributes-get.dto';

@Injectable()
export class EdgeAttributeService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: EdgeAttributesGetDTO) {
    const { edge_key, bypass_state } = options;

    const data = await this.prisma.edgeAttribute.findMany({
      where: {
        edge_key: edge_key,
        bypass_state: bypass_state,
      },
      orderBy: {
        id: 'asc', // Сортируем по id, так как он является последовательным
      },
    });

    return data;
  }
}