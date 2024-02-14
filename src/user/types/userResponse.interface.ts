import { UserType } from '@appuser/types/user.type';

export interface UserResponseInterface {
  user: UserType & { token: string };
}
