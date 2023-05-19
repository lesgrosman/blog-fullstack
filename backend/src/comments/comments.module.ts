import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [CommentsResolver, PrismaService, CommentsService],
  imports: [DatabaseModule],

  exports: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
