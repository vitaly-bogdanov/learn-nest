import { Injectable } from '@nestjs/common';
import { Track, Prisma } from '@prisma/client';
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
    name: string, 
    albumId?: number, 
    artistId?: number, 
    pictureFile?: Express.Multer.File, 
    audioFile?: Express.Multer.File
  ): Promise<Track> {
    let picture: string, audio: string;
    pictureFile && (picture = this.fileService.createFile(FileType.IMAGE, pictureFile));
    audioFile && (audio = this.fileService.createFile(FileType.AUDIO, audioFile));
    const slug: string = this.slugifyService.toSlug(name);
    return this.prismaService.track.create({ data: { name, artistId, albumId, picture, audio, slug } });
  }

  async update(data, id: number, files): Promise<Track> {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    let picture: string, 
        audio: string, 
        slug: string;

    if (data?.name) { // если меняем имя то меняем и slug
      slug = this.slugifyService.toSlug(data?.name);
    }
    
    if (files?.picture) {
      // удалить старый файл

      // записать новый
      picture = this.fileService.createFile(FileType.IMAGE, files.picture[0]);
    }

    if (files?.audio) {
      // удалить старый файл
      // записать новый
      audio = this.fileService.createFile(FileType.AUDIO, files.audio[0]);
    }

    return this.prismaService.track.update({ data: { ...data, slug, picture, audio }, where: { id } });
  }

  async getAll(count: string, offset: string): Promise<Track[]> {
    return this.prismaService.track.findMany({ skip: Number(offset), take: Number(count) });
  }

  async getOne(where: Prisma.TrackWhereUniqueInput): Promise<Track | null> {
    return this.prismaService.track.findUnique({ where, include: { comments: true, artist: true } });
  }

  async delete(where: Prisma.TrackWhereUniqueInput): Promise<void> {
    const track = await this.prismaService.track.delete({ where });
    this.fileService.removeFile(track.audio);
    this.fileService.removeFile(track.picture);
  }

  async listen(id: number): Promise<Track> {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    return this.prismaService.track.update({ data: { listens: track.listens + 1 }, where: { id }});
  }

  async search(query: string): Promise<Track[]> {
    return this.prismaService.track.findMany({ where: { name: { contains: query }}}); // поиск по содержанию строки
  }
}
