import { RequestExpressInterface } from '@apptypes/requestExpressInterface';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: any, contex: ExecutionContext) => {
    const requset = contex.switchToHttp().getRequest<RequestExpressInterface>();
    if (!requset.user) {
      return null;
    }
    if (data) {
      return requset.user[data];
    }
    return requset.user;
  },
);
