import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getUser(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
