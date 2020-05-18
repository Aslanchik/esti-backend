//VALIDATION
const Joi = require("@hapi/joi");

//REGISTER VALIDATION
const regVal = (data) => {
  const schema = Joi.object({
    _id: Joi.string().min(9).max(9).required(),
    full_name: Joi.string().max(255).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

//LOG IN VALIDATION
const logVal = (data) => {
  const schema = Joi.object({
    _id: Joi.string().min(9).max(9).required(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

module.exports.regVal = regVal;
module.exports.logVal = logVal;
