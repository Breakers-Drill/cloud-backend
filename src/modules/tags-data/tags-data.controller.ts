import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { InfraAuthGuard } from '@shared/guards';
import { CreateManyTagDataDto, CreateTagDataDto, DeleteManyTagDataDto, UpdateManyTagDataDto, UpdateTagDataDto } from './dto';
import { TagsDataService } from './tags-data.service';
import type { Response } from 'express';

@Controller('tags-data')
export class TagsDataController {
  constructor(private readonly tagsDataService: TagsDataService) {}

  @Post()
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @ApiOperation({ summary: 'Создать новую запись о теге' })
  @ApiBody({ type: CreateTagDataDto, description: 'Данные для создания записи о теге' })
  async create(@Body() dto: CreateTagDataDto) {
    const data = await this.tagsDataService.create(dto);
    if (!data) throw new BadRequestException('Ошибка создания информации о теге');
    return data;
  }

  @Post('many')
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @ApiOperation({ summary: 'Создать несколько записей о тегах' })
  @ApiBody({ type: CreateManyTagDataDto, description: 'Список данных для создания записей о тегах' })
  async createMany(@Body() dto: CreateManyTagDataDto) {
    const data = await this.tagsDataService.createMany(dto);
    if (!data) throw new BadRequestException('Ошибка массового создания информации о тегах');
    return data;
  }

  @Get()
  @ApiOperation({ summary: 'Получить все записи о тегах' })
  findAll() {
    return this.tagsDataService.findAll();
  }

  @Get('export/excel')
  @ApiOperation({ summary: 'Экспортировать все теги в Excel' })
  async exportExcel(@Res() res: Response) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="tags-data.xlsx"');
    const buffer = await this.tagsDataService.exportExcel();
    res.send(buffer);
  }

  @Post('import/excel')
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Импортировать теги из Excel (как экспорт, но без ID)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async importExcel(@UploadedFile() file: any) {
    if (!file || !file.buffer) throw new BadRequestException('Файл не найден');
    return this.tagsDataService.importExcel(file.buffer);
  }

  @Post('import/csv')
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Импортировать теги из CSV' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async importCsv(@UploadedFile() file: any) {
    if (!file || !file.buffer) throw new BadRequestException('Файл не найден');
    return this.tagsDataService.importCsv(file.buffer);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись о теге по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи', example: 1 })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tagsDataService.findOne(id);
    if (!data) throw new BadRequestException('Запись не найдена');
    return data;
  }

  @Delete('')
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @ApiOperation({ summary: 'Массовое удаление записей о тегах' })
  @ApiBody({ type: DeleteManyTagDataDto })
  async deleteMany(@Body() dto: DeleteManyTagDataDto) {
    const data = await this.tagsDataService.deleteMany(dto);
    if (!data) throw new BadRequestException('Ошибка массового удаления информации о тегах');
    return data;
  }

  @Delete(':id')
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @ApiOperation({ summary: 'Удалить запись о теге по ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID записи для удаления',
    example: 1,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tagsDataService.delete(id);
    if (!data) throw new BadRequestException('Ошибка удаления информации о теге');
    return data;
  }

  @Patch(':id')
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @ApiOperation({ summary: 'Обновить запись о теге по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи для обновления', example: 1 })
  @ApiBody({ type: UpdateTagDataDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTagDataDto) {
    const data = await this.tagsDataService.update(id, dto);
    if (!data) throw new BadRequestException('Ошибка обновления информации о теге');
    return data;
  }

  @Patch()
  @ApiSecurity('infra')
  @UseGuards(InfraAuthGuard)
  @ApiOperation({ summary: 'Массовое обновление записей о тегах' })
  @ApiBody({ type: UpdateManyTagDataDto })
  async updateMany(@Body() dto: UpdateManyTagDataDto) {
    const data = await this.tagsDataService.updateMany(dto);
    if (!data) throw new BadRequestException('Ошибка массового обновления информации о тегах');
    return data;
  }
}
