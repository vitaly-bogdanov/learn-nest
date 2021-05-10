import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { PrismaService } from '../prisma.service';
import { FileService } from '../file.service';
import { SlugifyService } from '../slugify.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, PrismaService, FileService, SlugifyService]
})
export class TrackModule {}