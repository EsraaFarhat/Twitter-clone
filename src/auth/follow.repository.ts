import { Repository, EntityRepository } from 'typeorm';

import { User } from './user.entity';
import { Follow } from './follow.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
  async followUser(loggedInUser: User, userToFollow: User): Promise<Follow> {
    const follow = this.create({
      user: loggedInUser,
      following: userToFollow,
    });
    try {
      return await this.save(follow);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
