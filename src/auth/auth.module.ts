import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
