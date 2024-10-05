const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "admin"),
});

const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
