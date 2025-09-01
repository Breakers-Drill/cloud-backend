import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EdgeBlocksGetDTO } from '../dto/edges-blocks-get.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EdgeBlockService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: EdgeBlocksGetDTO = {}) {
    const { edge_key, block_name } = options;

    const where: Prisma.EdgeBlockWhereInput = {};

    if (edge_key) {
      where.edge_key = edge_key;
    }

    if (block_name) {
      where.block_name = block_name;
    }

    const data = await this.prisma.edgeBlock.findMany({
      where,
      orderBy: {
        edge_key: 'asc',
      },
    });

    return data;
  }
}