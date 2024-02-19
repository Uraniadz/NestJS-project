import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsDb1707744214262 implements MigrationInterface {
  name = 'SeedsDb1707744214262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    // password is 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@foo.com', '$2b$10$HKzHkkq8VRGXk741rlFv1uFJzNgpwDsdxb7jEpoNbh93fDCJTK9Sq' )`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first article', 'first title', 'first article desc', 'first article body', 'coffee,dragons', 1 )`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second article', 'second title', 'second article desc', 'second article body', 'coffee,dragons', 1 )`,
    );
  }

  public async down(): Promise<void> {}
}
