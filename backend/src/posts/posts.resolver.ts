import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostGqlType, PostInputGqlType } from './posts.types';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';
import { GetUser } from 'src/shared/decorators';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { JwtDto } from 'src/auth/jwt.dto';

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

  @Mutation(() => PostGqlType)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args({ name: 'input', type: () => PostInputGqlType })
    input: PostInputGqlType,
    @GetUser() user: JwtDto,
  ): Promise<Post> {
    return this.postsService.createPost(user.id, input);
  }

  @Mutation(() => PostGqlType)
  @UseGuards(GqlAuthGuard)
  async updatePost(
    @Args({ name: 'input', type: () => PostInputGqlType })
    input: PostInputGqlType,
    @Args({ name: 'id', type: () => String }) postId: string,
    @GetUser() user: JwtDto,
  ): Promise<Post> {
    return this.postsService.updatePost(user.id, postId, input);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deletePost(
    @Args({ name: 'id', type: () => String }) id: string,
    @GetUser() user: JwtDto,
  ): Promise<string> {
    return this.postsService.deletePost(user.id, id);
  }
}
