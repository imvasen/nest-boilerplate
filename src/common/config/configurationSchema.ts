import * as joi from 'joi';

import { LogLevel, NodeEnvironment } from '@api/common/config/domain';

export const configurationSchema = joi.object({
  PORT: joi.number(),
  NODE_ENV: joi
    .string()
    .valid(...Object.values(NodeEnvironment))
    .default(NodeEnvironment.development),
  LOG_LEVEL: joi
    .string()
    .valid(...Object.values(LogLevel))
    .default(LogLevel.info),
});
