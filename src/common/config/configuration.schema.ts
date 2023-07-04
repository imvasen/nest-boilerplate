import * as joi from 'joi';

import { LogLevel, NodeEnvironment } from '@api/common/config/domain';

export const configurationSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  NODE_ENV: joi
    .string()
    .valid(...Object.values(NodeEnvironment))
    .default(NodeEnvironment.development),
  LOG_LEVEL: joi
    .string()
    .valid(...Object.values(LogLevel))
    .default(LogLevel.info),
  DATABASE_TYPE: joi.string().required(),
  DATABASE_HOST: joi.string().required(),
  DATABASE_PORT: joi.number().required(),
  DATABASE_USERNAME: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_NAME: joi.string().required(),
  DATABASE_SSL: joi.boolean().default(false),
});
