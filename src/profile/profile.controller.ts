import { User } from '@appuser/decorators/user.decorator';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfileResponseInterface } from './types/profileResponseInterface';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@appuser/guards/auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(
      currentUserId,
      profileUsername,
    );
    return this.profileService.buildProfileResponse(profile);
  }
  @Post(':username/follow')
  async followProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.followProfile(
      currentUserId,
      profileUername,
    );
    return this.profileService.buildProfileResponse(profile);
  }
}
