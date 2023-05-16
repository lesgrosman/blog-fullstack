import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User as Userdb } from '@prisma/client';
import { PostGqlType } from 'src/posts/posts.types';

export type User = Omit<Userdb, 'password'>;

@ObjectType('User')
export class UserGqlType implements User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => [PostGqlType])
  posts: PostGqlType[];

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
