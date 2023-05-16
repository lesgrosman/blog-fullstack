import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Comment } from '@prisma/client';
import { LikeGqlType } from 'src/likes/likes.types';
import { PostGqlType } from 'src/posts/posts.types';
import { UserGqlType } from 'src/user/user.types';

@ObjectType('Comment')
export class CommentGqlType implements Comment {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => UserGqlType)
  author: UserGqlType;

  @Field(() => ID)
  postId: string;

  @Field(() => PostGqlType)
  post: PostGqlType;

  @Field(() => [LikeGqlType])
  likes: LikeGqlType[];

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
