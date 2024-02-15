import { JWT_SECRET } from '@appconfig';
import { RequestExpressInterface } from '@apptypes/requestExpressInterface';
import { UserService } from '@appuser/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: any, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')['1'];

    // console.log('Token ', token);
    try {
      const decode: any = verify(token, JWT_SECRET);
      const user = await this.userService.findById(decode.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      console.log(err);
      next();
    }
  }
}
