import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTagDataDto } from './dto/create';
import { UpdateTagDataDto } from './dto/update';

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

  findOne(id: number) {
    return this.prisma.tagsData.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateTagDataDto) {
    return this.prisma.tagsData.update({ where: { id }, data }).catch(() => {
      return null;
    });
  }

  delete(id: number) {
    return this.prisma.tagsData.delete({ where: { id } }).catch(() => {
      return null;
    });
  }
}
