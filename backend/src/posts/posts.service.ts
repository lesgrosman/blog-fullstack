import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private dbService: DatabaseService) {}
  async getAllPosts(): Promise<Post[]> {
    return this.dbService.findAllPosts();
  }

  async getPostById(id: string): Promise<Post> {
    return this.dbService.findPostById(id);
  }
}
