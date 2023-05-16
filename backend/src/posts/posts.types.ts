import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Post } from '@prisma/client';
import { Category, CategoryGqlType } from 'src/categories/categories.types';
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

export type PostInput = {
  title: string;
  perex: string;
  content: string;
  category: Category;
};

@InputType('PostInput')
export class CreatePostInputGqlType implements Partial<Post> {
  @Field(() => String)
  title: string;

  @Field(() => String)
  perex: string;

  @Field(() => String)
  content: string;

  @Field(() => [CategoryGqlType])
  category: Category[];
}
