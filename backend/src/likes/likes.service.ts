import { ConflictException, Injectable } from '@nestjs/common';
import { Like } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LikesService {
  constructor(private dbService: DatabaseService) {}

  async likeComment(commentId: string, userId: string): Promise<Like> {
    const foundComment = await this.dbService.findComment(commentId);

    if (foundComment.likes.some((like) => like.authorId === userId)) {
      throw new ConflictException('User has already liked this comment');
    }

    return this.dbService.likeComment(commentId, userId);
  }

  async unlikeComment(commentId: string, userId: string): Promise<Like> {
    const foundComment = await this.dbService.findComment(commentId);

    if (
      foundComment.likes.filter((like) => like.authorId === userId).length < 1
    ) {
      throw new ConflictException('To unlike, user need to like comment first');
    }

    return this.dbService.unlikeComment(commentId, userId);
  }
}
