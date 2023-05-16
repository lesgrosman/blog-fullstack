import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User as UserDb } from '@prisma/client';
import { User } from 'src/user/user.types';
import { UserGqlType } from 'src/user/user.types';

/***
  refreshToken is provided as a http-only cookie
  accessToken should be used as an Authorization: Bearer <token>
*/
export interface Token {
  accessToken: string;
}

@ObjectType('Token')
export class TokenGqlType implements Token {
  @Field()
  accessToken: string;
}

export type SignupInput = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export interface LoginResponse {
  token: Token;
  user: User;
}

@ObjectType('LoginResponse')
export class LoginResponseGqlType implements LoginResponse {
  @Field(() => TokenGqlType)
  token: Token;

  @Field(() => UserGqlType)
  user: User;
}

@InputType('SignupInput')
export class SignupInputGqlType implements Partial<UserDb> {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}

export type LoginInput = Omit<SignupInput, 'firstName' | 'lastName'>;

@InputType('LoginInput')
export class LoginInputGqlType implements LoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
