const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");
// const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: function (req, file, cb) {
    const { _id } = req.user;
    const newName = `${_id}-${file.originalname}`;
    cb(null, newName);
  },
});

const limits = {
  fileSize: 1024 * 1024,
}; // set limit for files

// const fileFilter = (req, file, cb) => {
//   console.log("😁", file);
//   cb(null, true);
// };

const upload = multer({ storage, limits });

module.exports = upload;
