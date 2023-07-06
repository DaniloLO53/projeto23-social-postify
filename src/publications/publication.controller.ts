// src/publications/publications.controller.ts

import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publication.service';
import { CreatePublicationDto } from './publication.dto';
import { Publication } from './publication.interface';
import { AuthGuard } from 'src/users/user.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPublication(@Req() req): Promise<Publication> {
    const publication: CreatePublicationDto = req.body;
    const userId = req.user['id'];

    return this.publicationsService.createPublication({
      ...publication,
      userId,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getPublications(@Req() req): Promise<Publication[]> {
    const authorId = req.user['id'];
    return this.publicationsService.findPublicationByUserId(authorId);
  }
}
