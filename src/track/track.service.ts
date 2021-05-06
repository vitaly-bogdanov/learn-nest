import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Track, Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TrackCreateInput): Promise<Track> {
    return this.prismaService.track.create({ data });
  }

  async update(params: {
    data: Prisma.TrackUpdateInput;
    where: Prisma.TrackWhereUniqueInput;
  }): Promise<Track> {
    const { data, where } = params;
    return this.prismaService.track.update({ data, where });
  }

  async getAll(): Promise<Track[]> {
    return this.prismaService.track.findMany();
  }

  async getOne(where: Prisma.TrackWhereUniqueInput): Promise<Track | null> {
    return this.prismaService.track.findUnique({ where, include: { comments: true } });
  }

  async delete(where: Prisma.TrackWhereUniqueInput): Promise<Track> {
    return this.prismaService.track.delete({ where });
  }
}
