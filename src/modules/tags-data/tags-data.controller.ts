import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { InfraAuthGuard } from '@shared/guards';
import { CreateTagDataDto } from './dto';
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
}
