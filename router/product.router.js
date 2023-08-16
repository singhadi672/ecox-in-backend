const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("../model/product.model");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const response = await Product.find();
  res.status(200).json({ success: true, products: response });
});

module.exports = router;
