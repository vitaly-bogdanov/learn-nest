import { Injectable } from '@nestjs/common';
import { Track, Prisma } from '@prisma/client';
import { Express } from 'express';

import { PrismaService } from '../prisma.service';
import { FileService, FileType } from '../file.service';

@Injectable()
export class TrackService {
  constructor(
    private prismaService: PrismaService,
    private fileService: FileService
  ) {}

  async create(
    data: Prisma.TrackCreateInput, 
    picture: Express.Multer.File, 
    audio:Express.Multer.File
  ): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    return this.prismaService.track.create({ data: {...data, picture: picturePath, audio: audioPath } });
  }

  async update(params: {
    data: Prisma.TrackUpdateInput;
    where: Prisma.TrackWhereUniqueInput;
  }): Promise<Track> {
    const { data, where } = params;
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
    const listens = track.listens + 1;
    return this.prismaService.track.update({ data: { listens: listens }, where: { id }});
  }

  async search(query: string): Promise<Track[]> {
    return this.prismaService.track.findMany({ where: { name: { contains: query }}}); // поиск по содержанию строки
  }
}
