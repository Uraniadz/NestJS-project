import { UserType } from '@appuser/user.type';

export interface UserResponseInterface {
  user: UserType & { token: string };
}
