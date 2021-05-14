import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    if (albumId) {
      const albumCandidate = await this.prismaService.album.findUnique({ where: { id: albumId }, select: { id: true } });
      if (!albumCandidate) throw new HttpException('Указанного альбома не существует в базе данных', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (artistId) {
      const artistCandidate = await this.prismaService.artist.findUnique({ where: { id: artistId }, select: { id: true } });
      if (!artistCandidate) throw new HttpException('Указанного исполнителя не существует в базе данных', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.prismaService.track.create({ data: { name, artistId, albumId, picture, audio, slug } });
  }

  async update(
    id: number,
    name?: string, 
    albumId?: number, 
    artistId?: number, 
    pictureFile?: Express.Multer.File, 
    audioFile?: Express.Multer.File
  ): Promise<Track> {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    let picture: string, 
        audio: string, 
        slug: string;

    if (name) { // если меняем имя то меняем и slug
      slug = this.slugifyService.toSlug(name);
    }
    
    if (pictureFile) {
      // удалить старый файл
      this.fileService.removeFile(track.picture);
      // записать новый
      picture = this.fileService.createFile(FileType.IMAGE, pictureFile);
    }

    if (audioFile) {
      // удалить старый файл
      this.fileService.removeFile(track.audio);
      // записать новый
      audio = this.fileService.createFile(FileType.AUDIO, audioFile);
    }

    if (albumId) {
      const albumCandidate = await this.prismaService.album.findUnique({ where: { id: albumId }, select: { id: true } });
      if (!albumCandidate) throw new HttpException('Указанного альбома не существует в базе данных', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (artistId) {
      const artistCandidate = await this.prismaService.artist.findUnique({ where: { id: artistId }, select: { id: true } });
      if (!artistCandidate) throw new HttpException('Указанного исполнителя не существует в базе данных', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.prismaService.track.update({ data: { name, albumId, artistId, slug, picture, audio }, where: { id } });
  }

  async getAll(count: string, offset: string): Promise<Track[]> {
    return this.prismaService.track.findMany({ skip: Number(offset), take: Number(count) });
  }

  async getOne(where: Prisma.TrackWhereUniqueInput): Promise<Track | null> {
    return this.prismaService.track.findUnique({ where, include: { comments: true, artist: true } });
  }

  async delete(where: Prisma.TrackWhereUniqueInput): Promise<void> {
    if (await this.prismaService.track.findUnique({ where })) {
      const track = await this.prismaService.track.delete({ where });
      this.fileService.removeFile(track.audio);
      this.fileService.removeFile(track.picture);
    } else {
      throw new HttpException('Указанной композиции не существует', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async listen(id: number): Promise<Track> {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    return this.prismaService.track.update({ data: { listens: track.listens + 1 }, where: { id }});
  }

  async search(query: string): Promise<Track[]> {
    return this.prismaService.track.findMany({ where: { name: { contains: query }}}); // поиск по содержанию строки
  }
}
