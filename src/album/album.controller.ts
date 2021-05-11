import {
  Controller,
  Delete,
  Get,
  Param,
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { Album, Prisma } from '@prisma/client';

@ApiTags('albums')
@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  create(@Body() albumData: Prisma.AlbumCreateInput): Promise<Album> {
    return this.albumService.create(albumData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Prisma.AlbumCreateInput,
  ): Promise<Album> {
    return this.albumService.update({ data, where: { id: Number(id) } });
  }

  @Get()
  getAll(): Promise<Album[]> {
    return this.albumService.getAll();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string): Promise<Album> {
    return this.albumService.getOne({ id: Number(id) });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Album> {
    return this.albumService.delete({ id: Number(id) });
  }
}
