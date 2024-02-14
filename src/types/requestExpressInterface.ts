import { UserEntity } from '@appuser/user.entity';
import { Request } from 'express';
export class RequestExpressInterface extends Request {
  user?: UserEntity;
}
