import * as joi from 'joi';

export const configurationSchema = joi.object({
  PORT: joi.number(),
});
