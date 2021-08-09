import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { Tweet } from '../tweet/tweet.entity';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  // @Field(() => [Tweet])
  // tweets: Tweet[];

  //   @Field(() => [User])
  //   following: User[];
}
