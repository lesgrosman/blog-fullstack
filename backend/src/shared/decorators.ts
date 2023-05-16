import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

export const ResGql = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Response =>
    GqlExecutionContext.create(context).getContext().res,
);

export const ReqGql = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Request =>
    GqlExecutionContext.create(context).getContext().req,
);
