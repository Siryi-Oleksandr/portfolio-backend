// const path = require("path");
const fs = require("fs/promises");
const { HttpError, controllerWrapper, cloudinary } = require("../helpers/");
const Project = require("../models/project");

// *******************  /api/projects  ******************

const getProjects = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  if (favorite === "true") {
    filter.favorite = true;
  }
  if (favorite === "false") {
    filter.favorite = false;
  }
  const projects = await Project.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
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
  const { path: tempUpload } = req.file;

  const fileData = await cloudinary.uploader.upload(tempUpload, {
    folder: "posters",
  });
  await fs.unlink(tempUpload);

  const project = await Project.create({
    ...req.body,
    owner,
    posterURL: fileData.url,
  });

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

const updatePoster = controllerWrapper(async (req, res) => {
  const { projectId } = req.params;
  const { path: tempUpload } = req.file;

  const fileData = await cloudinary.uploader.upload(tempUpload, {
    folder: "posters",
  });
  await fs.unlink(tempUpload);
  // TODO delete old poster on claudinary/////////////////////////////////////////////////
  await Project.findByIdAndUpdate(projectId, { posterURL: fileData.url });
  res.json({
    posterURL: fileData.url,
  });
});

module.exports = {
  getProjects,
  addProject,
  getProjectById,
  updateProject,
  removeProject,
  updateStatusProject,
  updatePoster,
};
