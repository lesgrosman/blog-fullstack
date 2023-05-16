import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}
  async getAllComments(): Promise<Comment[]> {
    return this.prismaService.comment.findMany();
  }
}
