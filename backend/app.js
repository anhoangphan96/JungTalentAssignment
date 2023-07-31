const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productController = require("./controllers/product");
const orderController = require("./controllers/order");
const Product = require("./model/Product");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.get("/listproduct", productController.getListProduct);
app.post("/createorder", orderController.postCreateOrder);

mongoose
  .connect(
    "mongodb+srv://anphfx21936:Hoangan512@cluster0.5bjjwvg.mongodb.net/jungOrder"
  )
  .then(() => {
    //Nếu trong database chưa có 2 product có 2 sku này thì tiến hành tạo còn nếu có rồi thì bỏ qua mà bắt đầu chạy app
    console.log("Connected");
    Product.find({ sku: { $in: ["12341234", "12341235"] } }).then((result) => {
      if (result.length === 0) {
        const tshirt = new Product({
          price: "10.00",
          currency: "EUR",
          name: "T-Shirt",
          category: "clothes",
          sku: "12341234",
        });
        tshirt.save();
        const jeans = new Product({
          price: "20.00",
          currency: "EUR",
          name: "Jeans",
          category: "clothes",
          sku: "12341235",
        });
        jeans.save();
      }
    });

    app.listen(5000);
  })

  .catch((err) => {
    console.log(err);
  });
