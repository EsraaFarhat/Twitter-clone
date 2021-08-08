import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('UserSignUp')
export class UserSignUpType {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
