import {
  Controller,
  Delete,
  Get,
  Param,
  Body,
  Post,
  Put,
  UseInterceptors,
  UploadedFiles,
  Query
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track, Prisma } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount:1 }
  ]))
  create(
    @UploadedFiles() files, 
    @Body() data: Prisma.TrackCreateInput
  ) {
    const { picture, audio } = files;
    return this.trackService.create(data, picture[0], audio[0]);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.TrackUpdateInput,
  ): Promise<Track> {
    return this.trackService.update({ data, where: { id: Number(id) } });
  }

  @Get()
  getAll(
    @Query('count') count: string,
    @Query('offset') offset: string
  ): Promise<Track[]> {
    return this.trackService.getAll(Number(count), Number(offset));
  }

  @Get('/search')
  search(@Query('query') query: string): Promise<Track[]> {
    return this.trackService.search(query);
  }

  @Get(':id')
  getTrackById(@Param('id') id: string): Promise<Track> {
    return this.trackService.getOne({ id: Number(id) });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Track> {
    return this.trackService.delete({ id: Number(id) });
  }

  @Post(':id')
  listen(@Param('id') id: string) {
    this.trackService.listen(Number(id));
  }
}
