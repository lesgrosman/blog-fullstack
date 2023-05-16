import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Category as CategoryDb } from '@prisma/client';
import { PostGqlType } from 'src/posts/posts.types';

export type Category = Omit<CategoryDb, 'createdAt' | 'updatedAt'>;

@ObjectType('Category')
export class CategoryGqlType implements CategoryDb {
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
