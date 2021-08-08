import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTweetCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  body: string;
}
