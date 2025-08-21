import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTagDataDto } from './dto/create';
import { UpdateTagDataDto } from './dto/update';
import { UpdateManyTagDataDto } from './dto/update-many';
import { CreateManyTagDataDto } from './dto/create-many';
import { DeleteManyTagDataDto } from './dto/delete-many';

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

  async updateMany(dto: UpdateManyTagDataDto) {
    const operations = dto.items.map((item) =>
      this.prisma.tagsData.update({ where: { id: item.id }, data: {
        tag: item.tag,
        name: item.name,
        type: item.type,
        minValue: item.minValue,
        maxValue: item.maxValue,
      }}),
    );
    return this.prisma.$transaction(operations).catch(() => {
      return null;
    });
  }

  async createMany(dto: CreateManyTagDataDto) {
    const operations = dto.items.map((item) =>
      this.prisma.tagsData.create({ data: item }),
    );
    return this.prisma.$transaction(operations).catch(() => {
      return null;
    });
  }

  delete(id: number) {
    return this.prisma.tagsData.delete({ where: { id } }).catch(() => {
      return null;
    });
  }

  async deleteMany(dto: DeleteManyTagDataDto) {
    const operations = dto.ids.map((id) => this.prisma.tagsData.delete({ where: { id } }));
    return this.prisma.$transaction(operations).catch(() => {
      return null;
    });
  }
}
