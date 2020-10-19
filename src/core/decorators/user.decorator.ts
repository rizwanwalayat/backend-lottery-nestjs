import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const currentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;
  
      return data ? user && user[data] : user;
    },
  );