import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BlockTagsGetDTO } from '../dto/block-tags-get.dto';

@Injectable()
export class BlockTagService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: BlockTagsGetDTO) {
    const { tag, edge_key, block_name } = options;

    const data = await this.prisma.blockTag.findMany({
      where: {
        tag: tag,
        edge_key: edge_key,
        block_name: block_name,
      },
      orderBy: {
        tag: 'asc',
      },
    });

    return data;
  }
}