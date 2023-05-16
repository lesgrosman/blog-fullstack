import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsResolver } from './posts.resolver';

@Module({
  providers: [PostsResolver, PrismaService, PostsService],
  imports: [],
  exports: [PostsResolver, PostsService],
})
export class PostsModule {}
