import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class LogInInput {
  @MinLength(3)
  @Field()
  username: string;

  @MinLength(8)
  @Field()
  password: string;
}
