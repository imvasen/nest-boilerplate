import { registerAs } from '@nestjs/config';

export const loadConfig = () => ({
  port: parseInt(process.env.PORT, 10),
  logLevel: process.env.LOG_LEVEL,
  environment: process.env.NODE_ENV,
});

export const loadAuthConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));

export const loadDatabaseConfig = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL === 'true',
}));
