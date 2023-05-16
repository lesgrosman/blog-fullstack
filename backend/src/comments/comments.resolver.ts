import { Query, Resolver } from '@nestjs/graphql';
import { CommentGqlType } from './comments.types';
import { CommentsService } from './comments.service';

@Resolver(() => CommentGqlType)
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @Query(() => [CommentGqlType])
  async comments() {
    return await this.commentsService.getAllComments();
  }
}
