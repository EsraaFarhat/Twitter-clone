import { Repository, EntityRepository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Tweet } from './tweet.entity';
import { CreateTweetCredentialsDto } from './dto/tweet-credentials.dto';

@EntityRepository(Tweet)
export class TweetsRepository extends Repository<Tweet> {
  async createTweet(
    createTweetCredentialsDto: CreateTweetCredentialsDto,
    user: User,
  ): Promise<Tweet> {
    const { body } = createTweetCredentialsDto;

    const tweet = this.create({
      body,
      createdAt: new Date().toISOString(),
      user,
    });

    await this.save(tweet);
    return tweet;
  }
}
