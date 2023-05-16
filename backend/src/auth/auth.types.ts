import { Field, InputType } from '@nestjs/graphql';
import { User } from '@prisma/client';

export type SignupInput = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

@InputType('SignupInput')
export class SignupInputGqlType implements Partial<User> {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
