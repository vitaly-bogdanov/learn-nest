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
  Query, 
  Res,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';

import { ApiTags, ApiParam } from '@nestjs/swagger';
import { TrackService } from './track.service';
import { Track } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileFilter } from '../file.filter';

import { UploadTruckFilesDto } from './dto/upload-track-file.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@ApiTags('tracks')
@Controller('/tracks')
export class TrackController {
  constructor(
    private trackService: TrackService
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pictures', maxCount: 1 },
    { name: 'audios', maxCount:1 }
  ], { fileFilter: FileFilter }))
  create(
    @UploadedFiles() files: UploadTruckFilesDto, 
    @Body() data: CreateTrackDto
  ) {
    let { name, albumId, artistId } = data;
    let { pictures, audios } = files;
    let pictureFile: Express.Multer.File, audioFile: Express.Multer.File;
    albumId  && (albumId = Number(albumId));
    artistId && (artistId = Number(artistId));
    pictures && (pictureFile = pictures[0]);
    audios   && (audioFile = audios[0]);
    return this.trackService.create(name, albumId, artistId, pictureFile, audioFile);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount:1 }
  ], { fileFilter: FileFilter }))
  update(
    @Param('id') id: string,
    @UploadedFiles() files: UploadTruckFilesDto,
    @Body() data: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.update(data, Number(id), files);
  }

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
  delete(@Param('id') id: string, @Res() response: Response): void {
    this.trackService.delete({ id: Number(id) });
    response.status(HttpStatus.OK).send();
  }

  @Put('listens/:id')
  listen(@Param('id') id: string, @Res() response: Response): void {
    this.trackService.listen(Number(id));
    response.status(HttpStatus.OK).send();
  }
}
