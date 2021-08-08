/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { TweetsRepository } from './tweet.repository';
import { CreateTweetCredentialsDto } from './dto/tweet-credentials.dto';
import { Tweet } from './tweet.entity';
import { UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../auth/users.repository';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetsRepository)
    private tweetsRepository: TweetsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createTweet(
    createTweetCredentialsDto: CreateTweetCredentialsDto,
    payload,
  ): Promise<Tweet> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.tweetsRepository.createTweet(createTweetCredentialsDto, user);
  }
}
