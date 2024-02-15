import { IsEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsEmpty()
  readonly title: string;

  @IsEmpty()
  readonly description: string;

  @IsEmpty()
  readonly body: string;

  readonly taglist?: string[];
}
