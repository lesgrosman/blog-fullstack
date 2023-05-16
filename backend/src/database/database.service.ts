import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatabaseService {
  constructor(private prismaService: PrismaService) {}
  // posts
  async findAllPosts(): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async findPostById(id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }
}
