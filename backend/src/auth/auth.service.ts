import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupInput } from './auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup(signupInput: SignupInput): Promise<boolean> {
    const { username, password, firstName, lastName } = signupInput;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const isExistedUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (isExistedUser) {
      throw new ConflictException('The username is already exists');
    }

    try {
      await this.prismaService.user.create({
        data: {
          username,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }

    return true;
  }
}
