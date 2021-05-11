import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { Artist, Prisma } from '@prisma/client';

@ApiTags('artists')
@Controller('/artists')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  create(@Body() data: Prisma.ArtistCreateInput): Promise<Artist> {
    return this.artistService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.ArtistUpdateInput,
  ): Promise<Artist> {
    return this.artistService.update({ data, where: { id: Number(id) } });
  }

  @Get()
  getAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string): Promise<Artist> {
    return this.artistService.getOne({ id: Number(id) });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Artist> {
    return this.artistService.delete({ id: Number(id) });
  }
}
