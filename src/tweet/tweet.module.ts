import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsRepository } from './tweet.repository';
import { TweetResolver } from './tweet.resolver';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from '../auth/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TweetsRepository, UsersRepository]),
    AuthModule,
  ],
  providers: [TweetService, TweetResolver],
})
export class TweetModule {}
