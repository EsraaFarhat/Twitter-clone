import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserSignUpType } from './user-signup.type';
import { AuthService } from './auth.service';
import { CreateUserInput } from './user-signup.input';
import { UserLogInType } from './user-login.type';
import { LogInInput } from './user-login.input';
import { getUser } from './get-user.decorator';
import { UserType } from './user.type';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => UserType) // ! !!!!!!
// @UseGuards(AuthGuard())
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => UserSignUpType)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signUp(createUserInput);
  }

  @Mutation((returns) => UserLogInType)
  async logIn(@Args('logInInput') logInInput: LogInInput) {
    return await this.authService.logIn(logInInput);
  }

  @Mutation((returns) => UserType)
  async followUser(
    @Args('userToFollowId') userToFollowId: string,
    @getUser() payload,
  ) {
    const result = await this.authService.followUser(payload, userToFollowId);
    return result;
  }

  @Query(() => [UserType])
  async getMyFollowing(@getUser() payload) {
    return await this.authService.getMyFollowing(payload);
  }

  @Query(() => [UserType])
  async getMyFollowers(@getUser() payload) {
    return await this.authService.getMyFollowers(payload);
  }
}
