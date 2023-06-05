const express = require("express");
const {
  getProjects,
  addProject,
  getProjectById,
  updateProject,
  removeProject,
  updateStatusProject,
} = require("../../controllers/projectControllers");
const { isValidBody, isValidId } = require("../../middlewares");
const {
  joiProjectsSchema,
  joiUpdateStatusProjectSchema,
} = require("../../helpers/joiShemaValidation");

const router = express.Router();

router.get("/", getProjects);
router.get("/:projectId", isValidId, getProjectById);
router.post("/", isValidBody(joiProjectsSchema), addProject);
router.put(
  "/:projectId",
  isValidId,
  isValidBody(joiProjectsSchema),
  updateProject
);
router.patch(
  "/:projectId/favorite",
  isValidId,
  isValidBody(joiUpdateStatusProjectSchema),
  updateStatusProject
);
router.delete("/:projectId", isValidId, removeProject);

module.exports = router;
