const { HttpError } = require("../helpers/");
const Project = require("../models/project");
const controllerWrapper = require("../helpers/controllerWrapper");

// *******************  /api/projects  ******************

const getProjects = controllerWrapper(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

const getProjectById = controllerWrapper(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpError(404, `Project with ${projectId} not found`);
  }
  res.json(project);
});

const addProject = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const project = await Project.create({ ...req.body, owner });
  res.status(201).json(project);
});

const updateProject = controllerWrapper(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByIdAndUpdate(projectId, req.body, {
    new: true,
  });
  if (!project) {
    throw new HttpError(404, `project with ${projectId} not found`);
  }
  res.json(project);
});

const updateStatusProject = controllerWrapper(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByIdAndUpdate(projectId, req.body, {
    new: true,
  });
  if (!project) {
    throw new HttpError(404, `project with ${projectId} not found`);
  }
  res.json(project);
});

const removeProject = controllerWrapper(async (req, res) => {
  const { projectId } = req.params;
  const removedProject = await Project.findByIdAndRemove(projectId);
  if (!removedProject) {
    throw new HttpError(404, `Project with ${projectId} not found`);
  }
  res.json({ message: "project deleted" });
});

module.exports = {
  getProjects,
  addProject,
  getProjectById,
  updateProject,
  removeProject,
  updateStatusProject,
};
