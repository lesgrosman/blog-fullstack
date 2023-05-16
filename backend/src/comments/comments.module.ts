import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [CommentsResolver, PrismaService, CommentsService],
  imports: [],
  exports: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
