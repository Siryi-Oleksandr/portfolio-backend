const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers/");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: [true, "Set name for project"],
    },
    codeURL: {
      type: String,
      required: [true, "Set link to code current project"],
    },
    livePageURL: {
      type: String,
    },
    description: {
      type: String,
      minlength: 30,
    },
    posterURL: {
      type: String,
      // required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

projectSchema.post("save", handleMongooseError);

const Project = model("project", projectSchema);

module.exports = Project;
