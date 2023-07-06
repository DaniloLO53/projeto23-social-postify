import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Publication } from './publication.interface';

@Injectable()
export class PublicationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPublication(data: Publication): Promise<Publication> {
    console.log('Data: ', data);
    return this.prismaService.publication.create({ data });
  }

  async findPublicationByUserId(userId: number): Promise<Publication[]> {
    return this.prismaService.publication.findMany({ where: { userId } });
  }
}
