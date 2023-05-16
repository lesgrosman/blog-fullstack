import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  async getAllPosts(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  async getPostById(id: string): Promise<Post> {
    return this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
  }
}
