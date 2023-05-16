import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsResolver } from './posts.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [PostsResolver, PrismaService, PostsService],
  imports: [DatabaseModule],
  exports: [PostsResolver, PostsService],
})
export class PostsModule {}
