const express = require("express");
const Project = require("../../models/project");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("😍😎🙂");
  res.send(req.query);
});

router.post("/", async (req, res) => {
  // const { _id: owner } = req.user;
  const project = await Project.create({ ...req.body });
  res.status(201).json(project);
});

module.exports = router;
