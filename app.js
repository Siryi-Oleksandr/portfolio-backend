const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config(); // * add variables fron .env to process.env
const projectsRouter = require("./routes/api/projectsRouter");
const usersRouter = require("./routes/api/usersRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// *** middlewares:
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// *** main routers:
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);

// *** error handlers:
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

module.exports = app;
