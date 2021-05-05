import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Prisma, Comment } from '@prisma/client';

@Controller('/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  create(@Body() data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.commentService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.delete({ id: Number(id) });
  }
}
