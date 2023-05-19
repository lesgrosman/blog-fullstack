import { Injectable } from '@nestjs/common';
import { Comment, Post } from '@prisma/client';
import { CommentInputGqlType } from 'src/comments/comments.types';
import { PostInputGqlType } from 'src/posts/posts.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}
  // posts
  async findAllPosts(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        categories: true,
        author: true,
      },
    });
    return posts;
  }

  async findPostById(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
        author: true,
      },
    });

    return post;
  }

  async createPost(userId: string, postInput: PostInputGqlType): Promise<Post> {
    const { title, perex, content, categories } = postInput;
    const slug = title
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('-');

    const newCategories =
      categories.length !== 0
        ? await this.prisma.category.findMany({
            where: { id: { in: categories.map((category) => category.id) } },
          })
        : [];

    const post = await this.prisma.post.create({
      data: {
        title,
        perex,
        content,
        slug,
        categories: {
          connect: newCategories.map((category) => ({ id: category.id })),
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        categories: true,
        comments: true,
        author: true,
      },
    });

    return post;
  }

  async updatePost(
    userId: string,
    postId: string,
    postInput: PostInputGqlType,
  ) {
    const { title, perex, content, categories } = postInput;

    const slug = title
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('-');

    const unusedCategories = await this.prisma.category.findMany({
      where: { id: { notIn: categories.map((category) => category.id) } },
    });

    const newCategories = await this.prisma.category.findMany({
      where: { id: { in: categories.map((category) => category.id) } },
    });

    const post = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        perex,
        content,
        slug,
        categories: {
          disconnect: unusedCategories.map((category) => ({ id: category.id })),
          connect: newCategories.map((category) => ({ id: category.id })),
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        author: true,
        categories: true,
        comments: true,
      },
    });

    return post;
  }

  async deletePost(id: string): Promise<string> {
    const comments = await this.findComments(id);

    const deleteLikes = comments.map((comment) =>
      this.prisma.like.deleteMany({ where: { commentId: comment.id } }),
    );

    const deleteComments = this.prisma.comment.deleteMany({
      where: {
        postId: id,
      },
    });

    const deletePost = this.prisma.post.delete({
      where: {
        id,
      },
    });

    await this.prisma.$transaction([
      ...deleteLikes,
      deleteComments,
      deletePost,
    ]);

    return id;
  }

  // comments
  async findComment(id: string): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    return comment;
  }

  async findComments(postId: string): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        likes: true,
        author: true,
      },
    });

    return comments;
  }

  async createComment(
    postId: string,
    userId: string,
    input: CommentInputGqlType,
  ): Promise<Comment> {
    const { content } = input;

    const comment = await this.prisma.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    return comment;
  }

  async updateComment(
    id: string,
    input: CommentInputGqlType,
  ): Promise<Comment> {
    const { content } = input;

    const comment = await this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    return comment;
  }

  async deleteComment(id: string): Promise<string> {
    const deleteLikes = this.prisma.like.deleteMany({
      where: {
        commentId: id,
      },
    });

    const deleteComment = this.prisma.comment.delete({
      where: { id },
    });

    const transaction = await this.prisma.$transaction([
      deleteLikes,
      deleteComment,
    ]);

    return transaction[1].id;
  }
}
