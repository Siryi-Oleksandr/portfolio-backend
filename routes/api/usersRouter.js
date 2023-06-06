const express = require("express");
const {
  signup,
  login,
  logout,
  updateStatusUser,
  getCurrent,
} = require("../../controllers/userControllers");
const { isValidBody, authenticate } = require("../../middlewares");
const {
  joiSignUpSchema,
  joiLoginSchema,
  joiUpdateSubscriptionUser,
} = require("../../helpers/joiShemaValidation");

const router = express.Router();

router.post("/signup", isValidBody(joiSignUpSchema), signup);
router.post("/login", isValidBody(joiLoginSchema), login);
router.post("/logout", authenticate, logout);
router.put(
  "/",
  authenticate,
  isValidBody(joiUpdateSubscriptionUser),
  updateStatusUser
);
router.get("/current", authenticate, getCurrent);

module.exports = router;
