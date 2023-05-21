import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<Post>;
  slug: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type CategoryInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  likes: Array<Like>;
  post: Post;
  postId: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type CommentInput = {
  content: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  author: User;
  authorId: Scalars['ID'];
  comment: Comment;
  commentId: Scalars['ID'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Token;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  deleteComment: Scalars['String'];
  deletePost: Scalars['String'];
  likeComment: Like;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  refresh: LoginResponse;
  signup: Scalars['Boolean'];
  unlikeComment: Like;
  updateComment: Comment;
  updatePost: Post;
};


export type MutationCreateCommentArgs = {
  commentInput: CommentInput;
  postId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationLikeCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationSignupArgs = {
  signUpInput: SignupInput;
};


export type MutationUnlikeCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  commentInput: CommentInput;
  id: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  input: PostInput;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['String'];
  categories: Array<Category>;
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  perex: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  categories: Array<CategoryInput>;
  content: Scalars['String'];
  perex: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allComments: Array<Comment>;
  comments: Array<Comment>;
  myPosts: Array<Post>;
  post: Post;
  posts: Array<Post>;
  user: User;
};


export type QueryCommentsArgs = {
  postId: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};

export type SignupInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type AuthTokenFragment = { __typename?: 'Token', accessToken: string };

export type AuthUserFragment = { __typename?: 'User', id: string, username: string, firstName: string, lastName: string };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: { __typename?: 'Token', accessToken: string }, user: { __typename?: 'User', id: string, username: string, firstName: string, lastName: string } } };

export const AuthTokenFragmentDoc = gql`
    fragment AuthToken on Token {
  accessToken
}
    `;
export const AuthUserFragmentDoc = gql`
    fragment AuthUser on User {
  id
  username
  firstName
  lastName
}
    `;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    token {
      ...AuthToken
    }
    user {
      ...AuthUser
    }
  }
}
    ${AuthTokenFragmentDoc}
${AuthUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;