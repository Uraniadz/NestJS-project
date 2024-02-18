import { ArticleEntity } from '@apparticle/article.entity';

export type ArticleType = Omit<ArticleEntity, 'updateTimestamp'>;
// export type ArticleType = Pick<
//   ArticleEntity,
//   | 'id'
//   | 'slug'
//   | 'title'
//   | 'description'
//   | 'body'
//   | 'createAt'
//   | 'updateAt'
//   | 'tagList'
//   | 'author'
//   | 'favoritesCount'
// >;
