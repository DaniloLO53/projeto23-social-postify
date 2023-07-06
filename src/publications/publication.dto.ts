import { IsNotEmpty, IsDate, IsISO8601 } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  socialMedia: string;

  @IsNotEmpty()
  published: boolean;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsDate()
  @IsISO8601()
  dateToPublish: string;
}
