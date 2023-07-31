const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Schema and model of product to use mongodb
const productSchema = new Schema({
  price: { type: String, required: true },
  currency: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  sku: { type: String, required: true },
});
module.exports = mongoose.model("Product", productSchema);
