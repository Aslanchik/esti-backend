//VALIDATION
const Joi = require("@hapi/joi");

//REGISTER VALIDATION
const regVal = (data) => {
  const schema = Joi.object({
    govId: Joi.string().min(9).max(9).required(),
    fname: Joi.string().max(255).required(),
    lname: Joi.string().max(255).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

//LOG IN VALIDATION
const logVal = (data) => {
  const schema = Joi.object({
    govId: Joi.string().min(9).max(9).required(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

//Add New Patient VALIDATION
const addPatientVal = (data) => {
  const schema = Joi.object({
    govId: Joi.number().min(9).max(9).required(),
    fname: Joi.string().max(255).required(),
    lname: Joi.string().max(255).required(),
    birthDate: Joi.string().max(10).required(),
    phone: Joi.string().max(10).required(),
    email: Joi.string().min(6).required().email(),
    address: Joi.string().max(255).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

module.exports.addPatientVal = addPatientVal;
module.exports.regVal = regVal;
module.exports.logVal = logVal;
