import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CommentInputGqlType } from './comments.types';

@Injectable()
export class CommentsService {
  constructor(
    private prismaService: PrismaService,
    private dbService: DatabaseService,
  ) {}
  async getAllComments(): Promise<Comment[]> {
    return this.prismaService.comment.findMany();
  }

  async getComments(postId: string): Promise<Comment[]> {
    return this.dbService.findComments(postId);
  }

  async createComment(
    postId: string,
    userId: string,
    comment: CommentInputGqlType,
  ): Promise<Comment> {
    return this.dbService.createComment(postId, userId, comment);
  }

  async updateComment(
    id: string,
    userId: string,
    comment: CommentInputGqlType,
  ): Promise<Comment> {
    const foundComment = await this.dbService.findComment(id);

    if (foundComment.authorId !== userId) {
      throw new UnauthorizedException('You cannot edit this comment');
    }

    return this.dbService.updateComment(id, comment);
  }

  async deleteComment(id: string, userId: string): Promise<string> {
    const foundComment = await this.dbService.findComment(id);

    if (foundComment.authorId !== userId) {
      throw new UnauthorizedException('You cannot delete this comment');
    }

    return this.dbService.deleteComment(id);
  }
}
