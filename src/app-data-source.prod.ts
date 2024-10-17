import { DataSource } from 'typeorm';

export const AppDataSourceProd = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'rootpassword',
  database: process.env.POSTGRES_DB || 'todo',
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  synchronize: false,
});

console.log(
  'Postgres User:',
  process.env.POSTGRES_USER,
  'Postgres Password:',
  process.env.POSTGRES_PASSWORD,
  'Postgres DB:',
  process.env.POSTGRES_DB,
);
