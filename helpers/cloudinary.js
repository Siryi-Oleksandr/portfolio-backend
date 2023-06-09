const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;

// Response from Cloudinary API

// const response = {
//   asset_id: "5028001bc5a1800ce00ba4a14f7da50d",
//   public_id: "posters/fauekqh6hulqlssxhvve",
//   version: 1686301735,
//   version_id: "79dba50c88c1c45638e9df5b3ad8f05c",
//   signature: "d6679ffd71bc3c45394620151bb00b2754bf49a2",
//   width: 1952,
//   height: 3264,
//   format: "jpg",
//   resource_type: "image",
//   created_at: "2023-06-09T09:08:55Z",
//   tags: [],
//   bytes: 1036856,
//   type: "upload",
//   etag: "d8d1b22fd298444468bf99849864c3ec",
//   placeholder: false,
//   url: "http://res.cloudinary.com/dsjxdktiz/image/upload/v1686301735/posters/fauekqh6hulqlssxhvve.jpg",
//   secure_url:
//     "https://res.cloudinary.com/dsjxdktiz/image/upload/v1686301735/posters/fauekqh6hulqlssxhvve.jpg",
//   folder: "posters",
//   original_filename: "647e446da943e6adc32fb177-IMAG0089",
//   api_key: "876246527327858",
// };
