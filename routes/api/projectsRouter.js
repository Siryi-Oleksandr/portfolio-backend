const express = require("express");
const {
  getProjects,
  addProject,
} = require("../../controllers/projectControllers");

const router = express.Router();

router.get("/", getProjects);

router.post("/", addProject);

module.exports = router;
