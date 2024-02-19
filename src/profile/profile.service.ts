import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfileType } from './types/profile.type';
import { ProfileResponseInterface } from './types/profileResponseInterface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@appuser/user.entity';
import { Repository } from 'typeorm';
import { FollowEntity } from './follow.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReppository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followReppository: Repository<FollowEntity>,
  ) {}
  async getProfile(
    currentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userReppository.findOne({
      where: { username: profileUsername },
    });
    if (!user) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }

    const follow = await this.followReppository.findOne({
      where: { followerId: currentUserId, followingId: user.id },
    });

    return {
      ...user,
      following: Boolean(follow),
    };
  }

  buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
    delete profile.email;
    return {
      profile,
    };
  }
  async followProfile(
    currentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userReppository.findOne({
      where: { username: profileUsername },
    });
    if (!user) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }
    if (currentUserId === user.id) {
      throw new HttpException(
        'follower and following cant be equal',
        HttpStatus.BAD_REQUEST,
      );
    }
    const follow = await this.followReppository.findOne({
      where: { followerId: currentUserId, followingId: user.id },
    });
    // console.log('follow', follow);
    if (!follow) {
      const followToCreate = new FollowEntity();
      followToCreate.followerId = currentUserId;
      followToCreate.followingId = user.id;
      await this.followReppository.save(followToCreate);
    }
    // console.log('follow', follow);

    return { ...user, following: true };
  }

  async unfollowProfile(
    currentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userReppository.findOne({
      where: { username: profileUsername },
    });
    if (!user) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }
    if (currentUserId === user.id) {
      throw new HttpException(
        'follower and following cant be equal',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.followReppository.delete({
      followerId: currentUserId,
      followingId: user.id,
    });
    return { ...user, following: false };
  }
}
