import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserSignUpType } from './user-signup.type';
import { AuthService } from './auth.service';
import { CreateUserInput } from './user-signup.input';

@Resolver((of) => UserSignUpType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => UserSignUpType)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signUp(createUserInput);
  }
}
