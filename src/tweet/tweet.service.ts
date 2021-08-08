/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../auth/user.entity';
import { TweetsRepository } from './tweet.repository';
import { CreateTweetCredentialsDto } from './dto/tweet-credentials.dto';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetsRepository)
    private tweetsRepository: TweetsRepository,
  ) {}

  createTweet(
    createTweetCredentialsDto: CreateTweetCredentialsDto,
    // user: User,
  ): Promise<Tweet> {
    return this.tweetsRepository.createTweet(createTweetCredentialsDto);
  }
}
