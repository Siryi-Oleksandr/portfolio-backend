const express = require("express");
const {
  signup,
  login,
  logout,
  updateStatusUser,
  getCurrent,
  updateAvatar,
} = require("../../controllers/userControllers");
const { isValidBody, authenticate, upload } = require("../../middlewares");
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
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
