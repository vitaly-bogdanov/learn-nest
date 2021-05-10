import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma.service';
import { SlugifyService } from '../slugify.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService, SlugifyService],
})
export class ArtistModule {}
