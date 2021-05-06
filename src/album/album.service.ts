import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Album, Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AlbumCreateInput): Promise<Album> {
    return this.prisma.album.create({ data });
  }

  async update(params: {
    data: Prisma.AlbumCreateInput;
    where: Prisma.AlbumWhereUniqueInput;
  }): Promise<Album> {
    const { data, where } = params;
    return this.prisma.album.update({ data, where });
  }

  async getAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async getOne(where: Prisma.AlbumWhereUniqueInput): Promise<Album | null> {
    return this.prisma.album.findUnique({ where, include: { tracks: true } });
  }

  async delete(where: Prisma.AlbumWhereUniqueInput): Promise<Album> {
    return this.prisma.album.delete({ where });
  }
}
