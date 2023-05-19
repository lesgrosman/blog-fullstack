import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [LikesResolver, LikesService],
  exports: [LikesResolver, LikesService],
})
export class LikesModule {}
