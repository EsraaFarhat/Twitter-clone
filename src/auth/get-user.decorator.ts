import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

export const getUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const token = ctx.getArgByIndex(2).req.headers.authorization;
  const payload = jwt_decode(token);
  return payload;
});
