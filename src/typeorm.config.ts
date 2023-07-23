import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: configService.get('DATABASE_TYPE') as 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME') as string,
  ssl: configService.get('DATABASE_SSL') === 'true',
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['src/migrations/*.ts'],
  entities: ['src/**/*/*.entity.ts'],
});
