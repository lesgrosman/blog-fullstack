import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { PostGqlType } from './posts.types';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';

@Resolver(() => PostGqlType)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [PostGqlType])
  async posts() {
    return await this.postsService.getAllPosts();
  }

  @Query(() => PostGqlType)
  async post(@Args({ name: 'id', type: () => ID }) id: string): Promise<Post> {
    return this.postsService.getPostById(id);
  }
}
