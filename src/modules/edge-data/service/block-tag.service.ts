import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BlockTagsGetDTO } from '../dto/block-tags-get.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlockTagService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: BlockTagsGetDTO = {}) {
    const { tag, edge_key, block_name } = options;

    const where : Prisma.BlockTagWhereInput = {};

    if (tag) {
      where.tag = tag;
    }

    if (edge_key) {
      where.edge_key = edge_key;
    }

    if (block_name) {
      where.block_name = block_name;
    }

    const data = await this.prisma.blockTag.findMany({
      where,
      orderBy: {
        tag: 'asc',
      },
    });

    return data;
  }
}