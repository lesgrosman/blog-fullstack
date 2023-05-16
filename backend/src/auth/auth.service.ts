import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginInput, SignupInput } from './auth.types';
import { User } from '@prisma/client';
import { JwtDto } from './jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
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

  async login(
    loginInput: LoginInput,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { username, password } = loginInput;

    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtDto = { username, id: user.id };
      const accessToken = await this.jwtService.sign(payload);
      const refreshToken = await this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      return {
        user,
        accessToken,
        refreshToken,
      };
    } else {
      throw new UnauthorizedException('Please check auth credentials');
    }
  }
}
