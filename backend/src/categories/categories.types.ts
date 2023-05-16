import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Category } from '@prisma/client';
import { PostGqlType } from 'src/posts/posts.types';

@ObjectType('Category')
export class CategoryGqlType implements Category {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  slug: string;

  @Field(() => [PostGqlType])
  posts: PostGqlType[];

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
