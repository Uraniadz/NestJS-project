import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'project_nestjs',
  password: '123',
  database: 'nestdb',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
export default config;

// import { DataSource } from 'typeorm';

// const config = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'project_nestjs',
//   password: '123',
//   database: 'project_nestjs',
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: true,
// });
