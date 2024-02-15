import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { UserEntity } from '@appuser/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from './article.entity';
import { ArticleResponseInterface } from './types/articleResponse.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    if (!article.tagList) {
      article.tagList = [];
    }
    article.author = currentUser;

    article.slug = this.getSlug(createArticleDto.title);
    console.log(article.slug);

    return await this.articleRepository.save(article);
  }
  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return {
      article,
    };
  }
  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
  async findBySlug(slug: string): Promise<ArticleEntity> {
    // console.log('slug', slug);
    const article = await this.articleRepository.findOne({ where: { slug } });
    return article;
  }
  async deleteArticle(
    slug: string,
    idCurrentUser: number,
  ): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);
    console.log(article.id);
    console.log(idCurrentUser);
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    if (article.id !== idCurrentUser) {
      throw new HttpException(
        'You are not author this artile',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.articleRepository.delete({ slug });
  }
}
