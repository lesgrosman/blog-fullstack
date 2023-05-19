import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentGqlType, CommentInputGqlType } from './comments.types';
import { CommentsService } from './comments.service';
import { Comment } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { GetUser } from 'src/shared/decorators';
import { JwtDto } from 'src/auth/jwt.dto';

@Resolver(() => CommentGqlType)
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @Query(() => [CommentGqlType])
  async allComments() {
    return await this.commentsService.getAllComments();
  }

  @Query(() => [CommentGqlType])
  async comments(
    @Args({ name: 'postId', type: () => String }) postId: string,
  ): Promise<Comment[]> {
    return await this.commentsService.getComments(postId);
  }

  @Mutation(() => CommentGqlType)
  @UseGuards(GqlAuthGuard)
  async createComment(
    @Args({ name: 'postId', type: () => String }) postId: string,
    @Args({ name: 'commentInput', type: () => CommentInputGqlType })
    input: CommentInputGqlType,
    @GetUser() user: JwtDto,
  ): Promise<Comment> {
    return this.commentsService.createComment(postId, user.id, input);
  }

  @Mutation(() => CommentGqlType)
  @UseGuards(GqlAuthGuard)
  async updateComment(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'commentInput', type: () => CommentInputGqlType })
    input: CommentInputGqlType,
    @GetUser() user: JwtDto,
  ): Promise<Comment> {
    return this.commentsService.updateComment(id, user.id, input);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteComment(
    @Args({ name: 'id', type: () => String }) id: string,
    @GetUser() user: JwtDto,
  ): Promise<string> {
    return this.commentsService.deleteComment(id, user.id);
  }
}
