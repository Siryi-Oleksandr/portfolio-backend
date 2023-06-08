const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;

// const uploadCloud = multer({ storage });

// module.exports = uploadCloud;

// Контроллер - в який приходить шлях до каринки
// module.exports.petRegister = async (req, res) => {
//   const owner = req.user.id;
//   const petData = req.body;
//   const data = !!req.file
//     ? { avatarURL: req.file.path, owner, ...petData }
//     : { owner, ...petData };

//   Pet.create(data)
//     .then((pet) => {
//       if (pet) {
//         User.findByIdAndUpdate(owner, { $push: { userPets: pet._id } })
//           .then((user) => {
//             if (user) {
//               res.status(201).json({ success: true, pet });
//             }
//           })
//           .catch((err) => {
//             throw new Error(err);
//           });
//       }
//     })
//     .catch((err) =>
//       res.status(400).json({ success: false, error: err, message: err.message })
//     );
// };
