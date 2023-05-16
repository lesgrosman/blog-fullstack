import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, PrismaService, AuthService],
  exports: [AuthResolver, AuthService],
})
export class AuthModule {}
