import Joi from '@hapi/joi';

export const newCustomerValidator = (req, res, next) => {
  const schema = Joi.object({
    customerID: Joi.number().integer(),
    userID: Joi.number().integer(),
    fullName: Joi.string().min(1).required(),
    mobileNumber: Joi.string().min(3).required(),
    address: Joi.string().min(1).required(),
    cityOrTown: Joi.string().min(1).required(),
    state: Joi.string().min(1).required(),
    addressType: Joi.string().valid('home', 'office', 'other').required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
