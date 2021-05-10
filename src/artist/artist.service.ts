import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SlugifyService } from '../slugify.service';
import { Artist, Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(
    private prismaService: PrismaService,
    private slugifyService: SlugifyService
  ) {}

  async create(data: Prisma.ArtistCreateInput): Promise<Artist> {
    const slug: string = this.slugifyService.toSlug(data.name);
    return this.prismaService.artist.create({ data: { ...data, slug } });
  }

  async getAll(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }

  async update(params: {
    data: Prisma.ArtistUpdateInput;
    where: Prisma.ArtistWhereUniqueInput;
  }): Promise<Artist> {
    const { data, where } = params;
    return this.prismaService.artist.update({ data, where });
  }

  async getOne(where: Prisma.ArtistWhereUniqueInput): Promise<Artist> {
    return this.prismaService.artist.findUnique({ where, include: { tracks: true, albums: true } });
  }

  async delete(where: Prisma.ArtistWhereUniqueInput): Promise<Artist> {
    return this.prismaService.artist.delete({ where });
  }
}
