import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ReqGql, ResGql } from 'src/shared/decorators';
import { Request, Response } from 'express';
import {
  SignupInputGqlType,
  SignupInput,
  LoginResponseGqlType,
  LoginInputGqlType,
  LoginInput,
  LoginResponse,
} from './auth.types';
import { refreshTokenCookieName } from './constants';

const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[refreshTokenCookieName];
  }
  return token;
};

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Boolean)
  async signup(
    @Args({ name: 'signUpInput', type: () => SignupInputGqlType })
    signupInput: SignupInput,
  ): Promise<boolean> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => LoginResponseGqlType)
  async login(
    @Args({ name: 'loginInput', type: () => LoginInputGqlType })
    loginInput: LoginInput,
    @ResGql() res: Response,
  ): Promise<LoginResponse> {
    const { user, accessToken, refreshToken } = await this.authService.login(
      loginInput,
    );

    res.cookie(refreshTokenCookieName, refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return {
      user,
      token: {
        accessToken,
      },
    };
  }

  @Mutation(() => Boolean)
  async logout(
    @ResGql() res: Response,
    @ReqGql() req: Request,
  ): Promise<boolean> {
    const token = cookieExtractor(req);

    if (!token) return false;

    res.clearCookie(refreshTokenCookieName, { httpOnly: true, secure: true });

    return true;
  }
}
