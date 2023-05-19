import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { LikeGqlType } from './likes.types';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { GetUser } from 'src/shared/decorators';
import { JwtDto } from 'src/auth/jwt.dto';
import { Like } from '@prisma/client';

@Resolver()
export class LikesResolver {
  constructor(private likesService: LikesService) {}

  @Mutation(() => LikeGqlType)
  @UseGuards(GqlAuthGuard)
  async likeComment(
    @Args({ name: 'commentId', type: () => String }) commentId: string,
    @GetUser() user: JwtDto,
  ): Promise<Like> {
    return this.likesService.likeComment(commentId, user.id);
  }

  @Mutation(() => LikeGqlType)
  @UseGuards(GqlAuthGuard)
  async unlikeComment(
    @Args({ name: 'commentId', type: () => String }) commentId: string,
    @GetUser() user: JwtDto,
  ): Promise<Like> {
    return this.likesService.unlikeComment(commentId, user.id);
  }
}
