import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
      tweets: [],
    });
    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === '25305') {
        //duplicate username
        throw new ConflictException('Usrename already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  //   async followUser(loggedInUser: User, userToFollow: User): Promise<User> {
  // const user: User = await this.findOne({
  //   id: userToFollowId,
  // });
  // if (!loggedInUser.following) {
  //   loggedInUser.following = [];
  // }
  // if (!user.followers == undefined) {
  //   user.followers = [];
  // }
  // console.log(user);
  // loggedInUser.following.push(userToFollow);
  // user.followers.push(loggedInUser);
  // console.log(user.followers);
  // await this.save(loggedInUser);
  // await this.save(user);
  // return loggedInUser;
  //   }
}
