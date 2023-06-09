const { cloudinary } = require("../helpers");

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
