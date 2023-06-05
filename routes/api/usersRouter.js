const express = require("express");
const { signup, login } = require("../../controllers/userControllers");
const { isValidBody } = require("../../middlewares");
const {
  joiSignUpSchema,
  joiLoginSchema,
} = require("../../helpers/joiShemaValidation");

const router = express.Router();

router.post("/signup", isValidBody(joiSignUpSchema), signup);
router.post("/login", isValidBody(joiLoginSchema), login);

module.exports = router;
