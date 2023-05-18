import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { JwtDto } from 'src/auth/jwt.dto';

export const ResGql = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Response =>
    GqlExecutionContext.create(context).getContext().res,
);

export const ReqGql = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Request =>
    GqlExecutionContext.create(context).getContext().req,
);

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtDto => {
    return GqlExecutionContext.create(context).getContext().req.user;
  },
);
