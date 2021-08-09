import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interfece';
import { FollowRepository } from './follow.repository';
import { Follow } from './follow.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(FollowRepository)
    private followRepository: FollowRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async logIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: jwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async followUser(payload, userToFollowId: string): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    const userToFollow: User = await this.usersRepository.findOne({
      id: userToFollowId,
    });
    await this.followRepository.followUser(user, userToFollow);
    return user;
  }

  async getMyFollowing(payload): Promise<Follow[]> {
    const { username } = payload;
    const loggedInUser: User = await this.usersRepository.findOne({ username });

    if (!loggedInUser) {
      throw new UnauthorizedException();
    }
    return await this.followRepository.find({ user: loggedInUser });
  }

  async getMyFollowers(payload): Promise<Follow[]> {
    const { username } = payload;
    const loggedInUser: User = await this.usersRepository.findOne({ username });

    if (!loggedInUser) {
      throw new UnauthorizedException();
    }
    return await this.followRepository.find({ following: loggedInUser });
  }
}
