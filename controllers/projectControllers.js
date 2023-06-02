// const { HttpError } = require("../helpers/");
const Project = require("../models/project");
const controllerWrapper = require("../helpers/controllerWrapper");

// *******************  /api/projects  ******************

const getProjects = controllerWrapper(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

const addProject = controllerWrapper(async (req, res) => {
  const project = await Project.create({ ...req.body });
  res.status(201).json(project);
});

module.exports = { getProjects, addProject };
