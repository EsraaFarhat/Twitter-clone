import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('UserLogIn')
export class UserLogInType {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  accessToken: string;
}
