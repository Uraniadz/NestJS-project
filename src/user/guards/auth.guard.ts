import { RequestExpressInterface } from '@apptypes/requestExpressInterface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(contex: ExecutionContext): boolean {
    const request = contex.switchToHttp().getRequest<RequestExpressInterface>();
    if (request.user) {
      return true;
    } else {
      console.log('I am here');
      throw new HttpException('Not Authorizade', HttpStatus.UNAUTHORIZED);
    }
  }
}
