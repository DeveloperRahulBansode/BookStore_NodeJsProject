import Joi from '@hapi/joi';

export const newCartValidator = (req, res, next) => {
  const schema = Joi.object({
    bookID: Joi.number().integer(),

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
