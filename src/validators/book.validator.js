import Joi from '@hapi/joi';

export const newbookValidator = (req, res, next) => {
  const schema = Joi.object({
    bookID: Joi.number().integer(),
    description: Joi.string().min(3).required(),
    discountPrice: Joi.number().integer().min(0).required(),
    bookImage: Joi.string().uri().required(),
    bookName: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    quantity: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
