import { Injectable } from '@nestjs/common';
import { Track, Prisma } from '@prisma/client';
import { Express } from 'express';
import { SlugifyService } from '../slugify.service';
import { PrismaService } from '../prisma.service';
import { FileService, FileType } from '../file.service';

@Injectable()
export class TrackService {
  constructor(
    private prismaService: PrismaService,
    private fileService: FileService,
    private slugifyService: SlugifyService
  ) {}

  async create(
    data: Prisma.TrackCreateInput, 
    files
  ): Promise<Track> {
    let picturePath;
    let audioPath;
    const { picture, audio } = files;
    if (picture) {
      picturePath = this.fileService.createFile(FileType.IMAGE, picture[0]);
    } 
    if (audio) {
      audioPath = this.fileService.createFile(FileType.AUDIO, audio[0]);
    }
    const slug: string = this.slugifyService.toSlug(data.name);
    return this.prismaService.track.create({ data: {...data, slug, picture: picturePath, audio: audioPath } });
  }

  async update(params: {
    data: Prisma.TrackUpdateInput;
    where: Prisma.TrackWhereUniqueInput;
  }, files): Promise<Track> {
    const { data, where } = params;
    const { picture, audio } = files;
    const track = this.prismaService.track.findUnique({ where });
    if (picture) {
      // удалить старый файл
      // записать новый
      data.picture = '';
    }

    if (audio) {
      // удалить старый файл
      // записать новый
      data.audio = '';
    }

    return this.prismaService.track.update({ data, where });
  }

  async getAll(count: string, offset: string): Promise<Track[]> {
    return this.prismaService.track.findMany({ skip: Number(offset), take: Number(count) });
  }

  async getOne(where: Prisma.TrackWhereUniqueInput): Promise<Track | null> {
    return this.prismaService.track.findUnique({ where, include: { comments: true } });
  }

  async delete(where: Prisma.TrackWhereUniqueInput): Promise<Track> {
    return this.prismaService.track.delete({ where });
  }

  async listen(id: number): Promise<Track> {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    return this.prismaService.track.update({ data: { listens: track.listens + 1 }, where: { id }});
  }

  async search(query: string): Promise<Track[]> {
    return this.prismaService.track.findMany({ where: { name: { contains: query }}}); // поиск по содержанию строки
  }
}
