import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Comment } from '@prisma/client';

@Injectable()
export class CommentService {
    constructor(private prismaService: PrismaService) {}

    async create(data: Prisma.CommentCreateInput): Promise<Comment> {
        return this.prismaService.comment.create({ data });
    }

    async delete(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
        return this.prismaService.comment.delete({ where });
    }
}