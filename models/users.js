const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegex =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const subscriptionList = ["free", "pro", "premium"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 35,
      required: [true, "Set name for account"],
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: subscriptionList[0], // "free"
    },
    refreshToken: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    avatarID: {
      type: String,
      default: null,
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
