const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Home } = require("../model/home.model");

router.route("/").get(async (req, res) => {
  const homeResponse = await Home.find();
  res.json({ success: true, home: homeResponse });
});

module.exports = router;
