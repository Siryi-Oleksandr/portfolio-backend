const express = require("express");
const { signup } = require("../../controllers/userControllers");
const { isValidBody } = require("../../middlewares");
const { joiSignUpSchema } = require("../../helpers/joiShemaValidation");

const router = express.Router();

router.post("/signup", isValidBody(joiSignUpSchema), signup);

module.exports = router;
