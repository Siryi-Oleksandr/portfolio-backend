const bcrypt = require("bcrypt");
const {
  HttpError,
  controllerWrapper,
  assignTokens,
  cloudinary,
} = require("../helpers/");
const User = require("../models/users");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const Jimp = require("jimp");

// *******************  /api/users  ******************

const signup = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, `Email "${email}" should be unique`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {
    s: "250",
  });

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
});

const login = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, `Email or password invalid`);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new HttpError(401, `Email or password invalid`);
  }

  const { accessToken, refreshToken } = assignTokens(user);
  await User.findByIdAndUpdate(user._id, { refreshToken });

  res.json({
    accessToken,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
});

const logout = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { refreshToken: null });

  res.status(200).json({ message: "logout successfull" });
});

const updateStatusUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const newStatus = req.body.subscription;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription: newStatus },
    { new: true }
  );

  res.json({ user });
});

const getCurrent = controllerWrapper(async (req, res) => {
  const { name, email, subscription } = req.user;
  res.json({ name, email, subscription });
});

const updateAvatar = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;

  const image = await Jimp.read(tempUpload);
  image
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .write(tempUpload);

  const fileData = await cloudinary.uploader.upload(tempUpload, {
    folder: "avatars",
  });
  await fs.unlink(tempUpload);

  await User.findByIdAndUpdate(_id, { avatarURL: fileData.url });

  res.json({
    avatarURL: fileData.url,
  });
});

module.exports = {
  signup,
  login,
  logout,
  updateStatusUser,
  getCurrent,
  updateAvatar,
};
