import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TweetType } from './tweet.type';
import { TweetService } from './tweet.service';
import { TweetInput } from './tweet.input';

@Resolver((of) => TweetType)
export class TweetResolver {
  constructor(private tweetService: TweetService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => TweetType)
  createTweet(@Args('tweetInput') tweetInput: TweetInput) {
    return this.tweetService.createTweet(tweetInput);
  }
}
