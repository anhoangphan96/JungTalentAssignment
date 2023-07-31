const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Schema and model of product to use mongodb
const orderSchema = new Schema({
  totalAmount: { type: String, required: true },
  currency: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  givenNames: { type: String, required: true },
  surname: { type: String, required: true },
  line1: { type: String, required: true },
  suburb: { type: String, required: true },
  postcode: { type: String, required: true },
  countryCode: { type: String, required: true },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
