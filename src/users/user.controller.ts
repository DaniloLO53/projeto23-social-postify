// src/users/users.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInUserDto } from './user.dto';
import { User } from './user.interface';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('sign-up')
  async create(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Post('sign-in')
  async signIn(@Body() data: SignInUserDto): Promise<User> {
    return this.usersService.signInUser(data);
  }
}
