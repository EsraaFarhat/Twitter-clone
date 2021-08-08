import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TweetType } from './tweet.type';
import { TweetService } from './tweet.service';
import { TweetInput } from './tweet.input';
import { getUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Resolver((of) => TweetType)
export class TweetResolver {
  constructor(private tweetService: TweetService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => TweetType)
  createTweet(@Args('tweetInput') tweetInput: TweetInput, @getUser() payload) {
    return this.tweetService.createTweet(tweetInput, payload);
  }
}
