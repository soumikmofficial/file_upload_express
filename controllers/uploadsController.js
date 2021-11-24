const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
  // check if file is uploaded
  if (!req.files) {
    throw new CustomError.BadRequestError("Please add an image file");
  }
  const file = req.files.image;
  // check if uploaded file is image
  console.log(file.mimetype);
  if (!file.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload image files only");
  }
  // check if image is too big
  console.log(file.size);
  if (file.size > process.env.MAX_IMG_SIZE) {
    throw new CustomError.BadRequestError("Image is too big in size");
  }

  const filePath = path.join(__dirname, "../public/uploads/" + `${file.name}`);
  await file.mv(filePath);

  res.status(StatusCodes.OK).json({ image: { src: `/uploads/${file.name}` } });
};

const uploadProductImage = async (req, res) => {
  // check if file is uploaded
  if (!req.files) {
    throw new CustomError.BadRequestError("Please add an image file");
  }
  const file = req.files.image;
  // check if uploaded file is image
  if (!file.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload image files only");
  }
  // check if image is too big
  if (file.size > process.env.MAX_IMG_SIZE) {
    throw new CustomError.BadRequestError("Image is too big in size");
  }

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file_upload_express",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
