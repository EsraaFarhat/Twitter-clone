import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsRepository } from './tweet.repository';
import { TweetResolver } from './tweet.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TweetsRepository])],
  providers: [TweetService, TweetResolver],
})
export class TweetModule {}
