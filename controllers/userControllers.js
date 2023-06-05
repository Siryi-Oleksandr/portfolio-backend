const bcrypt = require("bcrypt");
const { HttpError } = require("../helpers/");
const User = require("../models/users");
const controllerWrapper = require("../helpers/controllerWrapper");

// *******************  /api/users  ******************

const signup = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, `Email "${email}" should be unique`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  //   const avatarURL = gravatar.url(email, {
  //     s: "250",
  //   });
  //   const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
});

const login = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
});

const logout = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
});

const updateStatusUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const newStatus = req.body.subscription;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription: newStatus },
    { new: true }
  );

  res.json({
    user,
  });
});

// const getCurrent = controllerWrapper(async (req, res) => {
//   const { email, subscription } = req.user;
//   res.json({ email, subscription });
// });

module.exports = {
  signup,
  login,
  logout,
  updateStatusUser,
};
