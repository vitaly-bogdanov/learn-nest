import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
    Artist,
    Prisma
} from '@prisma/client';

@Injectable()
export class ArtistService {
    constructor(private prismaService: PrismaService) {}

    async create(data: Prisma.ArtistCreateInput): Promise<Artist> {
        return this.prismaService.artist.create({ data });
    }

    async getAll(): Promise<Artist[]> {
        return this.prismaService.artist.findMany();
    }

    async update(params: { data: Prisma.ArtistUpdateInput, where: Prisma.ArtistWhereUniqueInput }): Promise<Artist> {
        const { data, where } = params;
        return this.prismaService.artist.update({ data, where });
    }

    async getOne(where: Prisma.ArtistWhereUniqueInput): Promise<Artist> {
        return this.prismaService.artist.findUnique({ where });
    }

    async delete(where: Prisma.ArtistWhereUniqueInput): Promise<Artist> {
        return this.prismaService.artist.delete({ where });
    }
}