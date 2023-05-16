import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Like } from '@prisma/client';
import { CommentGqlType } from 'src/comments/comments.types';
import { UserGqlType } from 'src/user/user.types';

@ObjectType('Like')
export class LikeGqlType implements Like {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => UserGqlType)
  author: UserGqlType;

  @Field(() => ID)
  commentId: string;

  @Field(() => CommentGqlType)
  comment: CommentGqlType;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
