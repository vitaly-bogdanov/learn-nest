import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { PrismaService } from '../prisma.service';
import { SlugifyService } from '../slugify.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService, SlugifyService],
})
export class AlbumModule {}
