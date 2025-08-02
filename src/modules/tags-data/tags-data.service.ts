import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTagDataDto } from './dto/create';

@Injectable()
export class TagsDataService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTagDataDto) {
    return this.prisma.tagsData.create({ data: dto }).catch(() => {
      return null;
    });
  }

  findAll() {
    return this.prisma.tagsData.findMany();
  }

  delete(id: number) {
    return this.prisma.tagsData.delete({ where: { id } }).catch(() => {
      return null;
    });
  }
}
