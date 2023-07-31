const Product = require("../model/Product");

exports.getListProduct = (req, res, next) => {
  Product.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
