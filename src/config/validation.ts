import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  WEBHOOK_SECRET: Joi.string().required(),
  API_KEY: Joi.string().required(),
});