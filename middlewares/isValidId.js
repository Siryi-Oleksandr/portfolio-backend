const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { projectId } = req.params;
  if (!isValidObjectId(projectId)) {
    next(new HttpError(400, `${projectId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
