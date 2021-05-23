const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { extend } = require("lodash");
const { User } = require("../model/user.model");
const { Cart } = require("../model/cart.model");
const { Wishlist } = require("../model/wishlist.model");

async function createUser() {
  let newUser = new User({ username: "admin", password: "admin" });
  let newCart = new Cart({ userId: newUser._id });
  let newWishlist = new Wishlist({ userId: newUser._id });
  newUser = extend(newUser, { cart: newCart._id, wishlist: newWishlist._id });
  const savedUser = await newUser.save();
  const savedCart = await newCart.save();
  const savedWishlist = await newWishlist.save();
  return savedUser;
}

async function populateUser() {
  const userDetails = await User.find()
    .populate("cart")
    .populate({
      path: "cart",
      populate: {
        path: "cartItems.product",
      },
    })
    .populate("wishlist")
    .populate({
      path: "wishlist",
      populate: {
        path: "wishlistItems.product",
      },
    });
  return userDetails;
}

router.route("/").get(async (req, res) => {
  const responseFromServer = await User.find();
  if (responseFromServer.length == 0) {
    await createUser();
    const response = await populateUser();
    res
      .status(200)
      .json({
        success: true,
        user: response,
        cartLength: response["0"].cart.cartItems.length,
        wishlistLength: response["0"].wishlist.wishlistItems.length,
      });
  } else {
    const response = await populateUser();
    res.status(200).json({
      success: true,
      user: response,
      cartLength: response["0"].cart.cartItems.length,
      wishlistLength: response["0"].wishlist.wishlistItems.length,
    });
  }
});

module.exports = router;
