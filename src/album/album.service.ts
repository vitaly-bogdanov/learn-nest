import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Album, Prisma } from '@prisma/client';
import { SlugifyService } from '../slugify.service';

@Injectable()
export class AlbumService {
  constructor(
    private prismaService: PrismaService,
    private slugifyService: SlugifyService
  ) {}

  async create(data: Prisma.AlbumCreateInput): Promise<Album> {
    const slug: string = this.slugifyService.toSlug(data.name);
    return this.prismaService.album.create({ data: {...data, slug} });
  }

  async update(params: {
    data: Prisma.AlbumCreateInput;
    where: Prisma.AlbumWhereUniqueInput;
  }): Promise<Album> {
    const { data, where } = params;
    return this.prismaService.album.update({ data, where });
  }

  async getAll(): Promise<Album[]> {
    return this.prismaService.album.findMany();
  }

  async getOne(where: Prisma.AlbumWhereUniqueInput): Promise<Album | null> {
    return this.prismaService.album.findUnique({ where, include: { tracks: true } });
  }

  async delete(where: Prisma.AlbumWhereUniqueInput): Promise<Album> {
    return this.prismaService.album.delete({ where });
  }
}
