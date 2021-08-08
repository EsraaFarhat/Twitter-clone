import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TweetType } from './tweet.type';
import { TweetService } from './tweet.service';
import { TweetInput } from './tweet.input';
import { getUser } from '../auth/get-user.decorator';

@Resolver((of) => TweetType)
export class TweetResolver {
  constructor(private tweetService: TweetService) {}

  @Query((returns) => [TweetType])
  getUserTweets(@getUser() payload) {
    return this.tweetService.getUserTweets(payload);
  }

  @Mutation((returns) => TweetType)
  createTweet(@Args('tweetInput') tweetInput: TweetInput, @getUser() payload) {
    return this.tweetService.createTweet(tweetInput, payload);
  }
}
