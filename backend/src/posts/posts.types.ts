import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Post } from '@prisma/client';
import { CategoryGqlType } from 'src/categories/categories.types';
import { CommentGqlType } from 'src/comments/comments.types';
import { UserGqlType } from 'src/user/user.types';

@ObjectType('Post')
export class PostGqlType implements Post {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  perex: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  authorId: string;

  @Field(() => UserGqlType)
  author: UserGqlType;

  @Field(() => [CategoryGqlType])
  categories: CategoryGqlType[];

  @Field(() => [CommentGqlType])
  comments: CommentGqlType[];

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
