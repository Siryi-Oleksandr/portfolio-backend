const express = require("express");
const {
  getProjects,
  addProject,
  getProjectById,
  updateProject,
  removeProject,
  updateStatusProject,
  updatePoster,
} = require("../../controllers/projectControllers");
const {
  isValidBody,
  isValidId,
  authenticate,
  upload,
} = require("../../middlewares");
const {
  joiProjectsSchema,
  joiUpdateStatusProjectSchema,
} = require("../../helpers/joiShemaValidation");

const router = express.Router();

router.use(authenticate); // checks user's authentication

router.get("/", getProjects);
router.get("/:projectId", isValidId, getProjectById);
router.post(
  "/",
  upload.single("poster"),
  isValidBody(joiProjectsSchema),
  addProject
);
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
router.patch(
  "/:projectId/posters",
  isValidId,
  upload.single("poster"),
  updatePoster
);
router.delete("/:projectId", isValidId, removeProject);

module.exports = router;
