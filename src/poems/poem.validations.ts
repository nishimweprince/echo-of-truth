import Joi from 'joi';
import { Poem } from './poem.entity';
import { PoemStatus } from './peom.constants';

export const validateCreatePoem = (poem: Partial<Poem>) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    messageId: Joi.string().required(),
    wallet: Joi.string().optional(),
    status: Joi.string()
      .valid(...Object.values(PoemStatus))
      .optional(),
  });

  return schema.validate(poem);
};
