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
import { ApiTags, ApiParam} from '@nestjs/swagger';
import { TrackService } from './track.service';
import { Track, Prisma } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileFilter } from '../file.filter';

import { UploadTruckFilesDto } from './dto/upload-track-file.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@ApiTags('tracks')
@Controller('/tracks')
export class TrackController {
  constructor(
    private trackService: TrackService
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount:1 }
  ], { fileFilter: FileFilter }))
  create(
    @UploadedFiles() files: UploadTruckFilesDto, 
    @Body() data: CreateTrackDto
  ) {
    return this.trackService.create(data, files);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() data: Prisma.TrackUpdateInput,
  // ): Promise<Track> {
  //   return this.trackService.update({ data, where: { id: Number(id) } });
  // }

  @ApiParam({ name: 'count', required: false })
  @ApiParam({ name: 'offset', required: false })
  @Get()
  getTracks(
    @Query('count') count: string = '10',
    @Query('offset') offset: string = '0'
  ): Promise<Track[]> {
    return this.trackService.getAll(count, offset);
  }

  @Get(':id')
  getTrackById(@Param('id') id: string): Promise<Track> {
    return this.trackService.getOne({ id: Number(id) });
  }

  @Get('/search')
  search(@Query('query') query: string): Promise<Track[]> {
    return this.trackService.search(query);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Track> {
    return this.trackService.delete({ id: Number(id) });
  }

  @Put('listens/:id')
  listen(@Param('id') id: string): void {
    this.trackService.listen(Number(id));
  }
}
