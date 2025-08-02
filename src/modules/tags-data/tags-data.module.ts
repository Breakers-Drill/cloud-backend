import { Module } from '@nestjs/common';
import { TagsDataController } from './tags-data.controller';
import { TagsDataService } from './tags-data.service';

@Module({
  controllers: [TagsDataController],
  providers: [TagsDataService],
  exports: [TagsDataService],
})
export class TagsDataModule {}
