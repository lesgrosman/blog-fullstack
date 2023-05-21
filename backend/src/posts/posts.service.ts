import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { PostInputGqlType } from './posts.types';
import { JwtDto } from 'src/auth/jwt.dto';

@Injectable()
export class PostsService {
  constructor(private dbService: DatabaseService) {}
  async getAllPosts(): Promise<Post[]> {
    return this.dbService.findAllPosts();
  }

  async getMyPosts(user: JwtDto): Promise<Post[]> {
    return this.dbService.findMyPosts(user.id);
  }

  async getPostById(id: string): Promise<Post> {
    return this.dbService.findPostById(id);
  }

  async createPost(userId: string, postInput: PostInputGqlType): Promise<Post> {
    return this.dbService.createPost(userId, postInput);
  }

  async updatePost(
    userId: string,
    postId: string,
    postInput: PostInputGqlType,
  ): Promise<Post> {
    const post = await this.dbService.findPostById(postId);

    if (!post) {
      throw new NotFoundException('The post doesnt exist');
    }

    if (post.authorId !== userId) {
      throw new UnauthorizedException('You cannot delete this post');
    }

    return this.dbService.updatePost(userId, postId, postInput);
  }

  async deletePost(userId: string, postId: string): Promise<string> {
    const post = await this.dbService.findPostById(postId);

    if (!post) {
      throw new NotFoundException('The post doesnt exist');
    }

    if (post.authorId !== userId) {
      throw new UnauthorizedException('You cannot delete this post');
    }

    return this.dbService.deletePost(postId);
  }
}
