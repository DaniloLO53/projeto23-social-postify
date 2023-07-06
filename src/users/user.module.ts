import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { AuthGuard, UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UserService, AuthGuard, PrismaService],
  exports: [UserService, AuthGuard],
})
export class UsersModule {}
