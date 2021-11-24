const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ success: true, products });
};

module.exports = { createProduct, getAllProducts };
