import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ThresholdsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.thresholds.findMany();
  }

  async create(data: Prisma.ThresholdsCreateInput) {
    return this.prisma.thresholds.create({ data }).catch(() => {
      throw new BadRequestException('Ошибка создания!');
    });
  }

  async update(where: Prisma.ThresholdsWhereUniqueInput, data: Prisma.ThresholdsUpdateInput) {
    return this.prisma.thresholds.update({ where, data }).catch(() => {
      throw new BadRequestException('Ошибка обновления!');
    });
  }

  async delete(data: Prisma.ThresholdsWhereUniqueInput) {
    return this.prisma.thresholds.delete({ where: data }).catch(() => {
      return null;
    });
  }
}
