const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Halal Food Foundation",
    allowed_formats: ["png", "jpg", "gif"],
  },
});

const uploadNewsImages = multer({ storage });

module.exports = uploadNewsImages;
