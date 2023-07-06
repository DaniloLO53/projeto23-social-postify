// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { PublicationsModule } from './publications/publication.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PublicationsModule],
  providers: [PrismaService],
})
export class AppModule {}
