import { UserType } from '@appuser/types/user.type';

export type ProfileType = UserType & {
  following: boolean;
};
