const Joi = require("joi");

// const emailRegex =
//   /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const joiProjectsSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "any.required": "Missing required 'name' field",
    "string.min": "The length of 'name' must be between 3 and 100 characters",
    "string.max": "The length of 'name' must be between 3 and 100 characters",
  }),

  codeURL: Joi.string()
    .required()
    .messages({ "any.required": "Missing required 'project code' field" }),

  livePageURL: Joi.string(),

  description: Joi.string().messages({
    "string.min": "The length of 'name' must be between 30 characters",
  }),

  titleURL: Joi.string(),

  favorite: Joi.boolean(),
});

const joiUpdateStatusProjectSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

module.exports = { joiProjectsSchema, joiUpdateStatusProjectSchema };
