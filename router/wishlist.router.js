const express = require("express");
const { extend } = require("lodash");
const mongoose = require("mongoose");
const { Wishlist } = require("../model/wishlist.model");
const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { productId } = req.body;
      if (productId) {
        let wishlist = await Wishlist.findOne();

        wishlist.wishlistItems.push({
          product: productId,
        });

        const response = await wishlist.save();
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
        let wishlist = await Wishlist.findOne();
        const filteredWishlist = wishlist.wishlistItems.filter(
          (item) => item.product != productId
        );
        wishlist.wishlistItems = filteredWishlist;

        const response = await wishlist.save();
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

module.exports = router;
