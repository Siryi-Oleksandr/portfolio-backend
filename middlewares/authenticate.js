const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { assignTokens } = require("../helpers");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(new HttpError(401, "Not authorized (invlid or absent token)"));
  }

  const decoded = jwt.decode(token);
  let user;

  try {
    user = await User.findById(decoded.userId);

    if (!user || !user.refreshToken) {
      throw new HttpError(401, "Not authorized");
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    req.user = user; // add user to request and  we will have this info in controller
    next();
  } catch (err) {
    if (err.name !== "TokenExpiredError")
      return next(new HttpError(401, err.message || "Not authorized"));

    try {
      jwt.verify(user.refreshToken, REFRESH_TOKEN_SECRET_KEY);
      const { accessToken, refreshToken } = assignTokens(user);
      await User.findByIdAndUpdate(user.userId, { refreshToken });
      res.json({ accessToken });
    } catch (err) {
      next(new HttpError(401, "refresh token is expired"));
    }
  }
};

module.exports = authenticate;
