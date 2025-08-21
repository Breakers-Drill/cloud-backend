import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { InfraAuthGuard } from '@shared/guards';
import { CreateTagDataDto, UpdateTagDataDto } from './dto';
import { TagsDataService } from './tags-data.service';

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

  @Get()
  @ApiOperation({ summary: 'Получить все записи о тегах' })
  findAll() {
    return this.tagsDataService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись о теге по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи', example: 1 })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tagsDataService.findOne(id);
    if (!data) throw new BadRequestException('Запись не найдена');
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
}
