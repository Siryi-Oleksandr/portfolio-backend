const { HttpError } = require("../helpers");

const isValidBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(422, error.message));
      return;
    }
    next();
  };
};

module.exports = isValidBody;
