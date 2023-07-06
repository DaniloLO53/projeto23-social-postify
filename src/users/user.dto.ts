import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  avatar: string;
}

export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(6)
  password: string;
}
