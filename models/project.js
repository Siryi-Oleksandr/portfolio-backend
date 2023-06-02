const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers/");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 35,
      required: [true, "Set name for project"],
    },

    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

projectSchema.post("save", handleMongooseError);

const Project = model("project", projectSchema);

module.exports = Project;
