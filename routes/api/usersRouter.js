const express = require("express");
const { signup, login, logout } = require("../../controllers/userControllers");
const { isValidBody, authenticate } = require("../../middlewares");
const {
  joiSignUpSchema,
  joiLoginSchema,
} = require("../../helpers/joiShemaValidation");

const router = express.Router();

router.post("/signup", isValidBody(joiSignUpSchema), signup);
router.post("/login", isValidBody(joiLoginSchema), login);
router.post("/logout", authenticate, logout);

module.exports = router;
