const express = require("express");
const { extend } = require("lodash");
const mongoose = require("mongoose");
const { Cart } = require("../model/cart.model");
const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { productId } = req.body;
      if (productId) {
        let cart = await Cart.findOne();
        cart.cartItems.push({
          product: productId,
          quantity: 1,
        });

        const response = await cart.save();
        res.status(201).json({ success: true, response });
      } else {
        res
          .status(400)
          .json({ success: false, message: "request body not found/invalid" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        success: false,
        message: "error occured for the request, check the stack trace",
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { productId } = req.body;
      if (productId) {
        let cart = await Cart.findOne();
        const filteredCart = cart.cartItems.filter(
          (item) => item.product != productId
        );
        cart.cartItems = filteredCart;

        const response = await cart.save();
        res.status(201).json({ success: true, response });
      } else {
        res.status(400).json({
          success: false,
          message: "request body not found/invalid",
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        success: false,
        message: "error occured for the request, check the stack trace",
      });
    }
  });

router.route("/:productId").post(async (req, res) => {
  try {
    const { type } = req.body;
    const { productId } = req.params;
    const cart = await Cart.findOne();
    let { quantity } = cart.cartItems.find((item) => item.product == productId);
    type && type === "inc"
      ? (quantity = quantity + 1)
      : (quantity = quantity - 1);
    const response = await Cart.updateOne(
      { "cartItems.product": productId },
      { $set: { "cartItems.$.quantity": quantity } }
    );

    res.status(200).json({ success: true, response });
  } catch (err) {}
});
module.exports = router;
