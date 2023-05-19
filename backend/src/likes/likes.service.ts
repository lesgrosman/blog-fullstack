import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LikesService {
  constructor(private dbService: DatabaseService) {}
}
