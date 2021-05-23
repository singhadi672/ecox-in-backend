const mongoose = require("mongoose");
const { productsTemplate } = require("../db/templates.db");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  material: String,
  brand: String,
  inStock: Boolean,
  quantity: Number,
  fastDelivery: Boolean,
  ratings: Number,
  offer: String,
  productCategory: String,
  color: String,
});

const Product = mongoose.model("Product", ProductSchema);

//  use this function to populate products collection once

async function populateProducts() {
  try {
    productsTemplate.forEach(async (item) => {
      const product = new Product(item);
      const savedProduct = await product.save();
      console.log(savedProduct);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Product, populateProducts };
