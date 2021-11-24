const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [50, "Product name too long"],
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
