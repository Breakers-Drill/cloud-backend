import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTagDataDto } from './dto/create';
import { UpdateTagDataDto } from './dto/update';
import { UpdateManyTagDataDto } from './dto/update-many';
import { CreateManyTagDataDto } from './dto/create-many';
import { DeleteManyTagDataDto } from './dto/delete-many';
import { Workbook } from 'exceljs';

@Injectable()
export class TagsDataService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTagDataDto) {
    return this.prisma.tagsData.create({ data: {
      tag: dto.tag,
      name: dto.name,
      type: dto.type,
      minValue: dto.minValue,
      maxValue: dto.maxValue,
      multiplier: dto.multiplier ?? 1,
      comment: dto.comment ?? '',
    } }).catch(() => {
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
        multiplier: item.multiplier,
        comment: item.comment,
      }}),
    );
    return this.prisma.$transaction(operations).catch(() => {
      return null;
    });
  }

  async createMany(dto: CreateManyTagDataDto) {
    const operations = dto.items.map((item) =>
      this.prisma.tagsData.create({ data: {
        tag: item.tag,
        name: item.name,
        type: item.type,
        minValue: item.minValue,
        maxValue: item.maxValue,
        multiplier: item.multiplier ?? 1,
        comment: item.comment ?? '',
      } }),
    );
    return this.prisma.$transaction(operations).catch(() => {
      return null;
    });
  }

  async exportExcel() {
    const rows = await this.findAll();

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('TagsData');
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Tag', key: 'tag', width: 30 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Type', key: 'type', width: 10 },
      { header: 'Min', key: 'minValue', width: 10 },
      { header: 'Max', key: 'maxValue', width: 10 },
      { header: 'Multiplier', key: 'multiplier', width: 12 },
      { header: 'Comment', key: 'comment', width: 40 },
    ];

    const mappedRows = rows.map((row) => ({
      id: row.id,
      tag: row.tag,
      name: row.name,
      type: row.type,
      minValue: row.minValue,
      maxValue: row.maxValue,
      multiplier: (row as any).multiplier ?? 1,
      comment: (row as any).comment ?? '',
    }));
    worksheet.addRows(mappedRows);

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as unknown as Buffer;
  }

  async importExcel(buffer: Buffer) {
    const workbook = new Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet('TagsData') || workbook.worksheets[0];
    if (!worksheet) return [];

    const headerRow = worksheet.getRow(1);
    const headerToIndex: Record<string, number> = {};
    headerRow.eachCell((cell, colNumber) => {
      const header = String(cell.value || '').trim().toLowerCase();
      if (header) headerToIndex[header] = colNumber;
    });

    const getCellValue = (row: number, header: string) => {
      const idx = headerToIndex[header];
      if (!idx) return undefined;
      const cell = worksheet.getRow(row).getCell(idx);
      const v = cell.value as any;
      if (v && typeof v === 'object' && 'result' in v) return (v as any).result;
      return v;
    };

    const operations = [] as any[];
    for (let r = 2; r <= worksheet.rowCount; r++) {
      const tag = String(getCellValue(r, 'tag') ?? '').trim();
      const name = String(getCellValue(r, 'name') ?? '').trim();
      const type = String(getCellValue(r, 'type') ?? '').trim();
      const minValueRaw = getCellValue(r, 'min');
      const maxValueRaw = getCellValue(r, 'max');
      const multiplierRaw = getCellValue(r, 'multiplier');
      const commentRaw = getCellValue(r, 'comment');

      if (!tag || !name || !type) continue;

      const minValue = Number.isFinite(Number(minValueRaw)) ? Math.round(Number(minValueRaw)) : 0;
      const maxValue = Number.isFinite(Number(maxValueRaw)) ? Math.round(Number(maxValueRaw)) : 0;
      const multiplier = Number.isFinite(Number(multiplierRaw)) ? Number(multiplierRaw) : 1;
      const comment = commentRaw != null ? String(commentRaw) : '';

      operations.push(
        this.prisma.tagsData.upsert({
          where: { tag },
          update: { name, type, minValue, maxValue, multiplier, comment },
          create: { tag, name, type, minValue, maxValue, multiplier, comment },
        })
      );
    }

    if (operations.length === 0) return [];
    return this.prisma.$transaction(operations);
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
