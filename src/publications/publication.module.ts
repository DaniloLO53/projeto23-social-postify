import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PublicationsController } from './publication.controller';
import { PublicationsService } from './publication.service';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, PrismaService],
})
export class PublicationsModule {}
