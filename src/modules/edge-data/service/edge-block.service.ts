import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EdgeBlocksGetDTO } from '../dto/edges-blocks-get.dto';

@Injectable()
export class EdgeBlockService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: EdgeBlocksGetDTO) {
    const { edge_key, block_name } = options;

    const data = await this.prisma.edgeBlock.findMany({
      where: {
        edge_key: edge_key,
        block_name: block_name,
      },
      orderBy: {
        edge_key: 'asc',
      },
    });

    return data;
  }
}