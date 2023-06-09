const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class CloudinaryAPI {
  constructor(folder) {
    this.folder = folder;
  }

  async upload(tempPath) {
    const fileData = await cloudinary.uploader.upload(tempPath, {
      folder: this.folder,
    });

    return fileData;
  }

  async delete(fileID) {
    await cloudinary.uploader.destroy(fileID);
  }
}

module.exports = CloudinaryAPI;
