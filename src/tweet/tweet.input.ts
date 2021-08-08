import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class TweetInput {
  @MinLength(3)
  @Field()
  body: string;
}
