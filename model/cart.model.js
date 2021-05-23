const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      productID: Number,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
