const Order = require("../model/Order");
const sdk = require("api")("@scalapaydocs/v1.1#4won2elk6oqe21");
exports.postCreateOrder = (req, res, next) => {
  const totalAmount = req.body.listCart.reduce(
    (total, item) => total + +item.quantity * +item.price,
    0
  );
  const listItem = req.body.listCart.map((item) => {
    return { productId: item._id, quantity: item.quantity };
  });
  Order.create({
    totalAmount: totalAmount.toString(),
    currency: "EUR",
    phoneNumber: req.body.phone,
    givenNames: req.body.firstname,
    surname: req.body.surname,
    line1: req.body.line1,
    suburb: req.body.suburb,
    postcode: req.body.postcode,
    countryCode: req.body.countryCode,
    items: listItem,
  })
    .then((order) => {
      return order.populate("items.productId");
    })
    .then((result) => {
      const listItem = result.items.map((item) => {
        return {
          price: {
            currency: item.productId.currency,
            amount: item.productId.price,
          },
          name: item.productId.name,
          category: item.productId.category,
          sku: item.productId.sku,
          quantity: item.quantity,
        };
      });
      sdk.auth("Bearer qhtfs87hjnc12kkos");
      return sdk.postV2Orders({
        totalAmount: {
          currency: result.currency,
          amount: result.totalAmount,
        },
        consumer: {
          phoneNumber: result.phoneNumber,
          givenNames: result.givenNames,
          surname: result.surname,
        },
        billing: {
          name: result.givenNames + result.surname,
          line1: result.line1,
          suburb: result.suburb,
          postcode: result.postcode,
          countryCode: result.countryCode,
          phoneNumber: result.phoneNumber,
        },
        shipping: {
          name: result.givenNames + result.surname,
          line1: result.line1,
          suburb: result.suburb,
          postcode: result.postcode,
          countryCode: result.countryCode,
          phoneNumber: result.phoneNumber,
        },
        items: listItem,
        merchant: {
          redirectConfirmUrl:
            "https://portal.integration.scalapay.com/success-url",
          redirectCancelUrl:
            "https://portal.integration.scalapay.com/failure-url",
        },
        type: "online",
        product: "pay-in-3",
        orderExpiryMilliseconds: 6000000,
      });
    })
    .then(({ data }) => res.status(200).json(data))
    .catch((err) => console.error(err.data.message.errors));
};
