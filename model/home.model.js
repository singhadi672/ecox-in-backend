const mongoose = require("mongoose");
const {
  carouselImages,
  category,
  spotlightTemplate,
} = require("../db/templates.db");

const HomeSchema = new mongoose.Schema({
  carouselImages: Array,
  category: Array,
  spotlights: Array,
});

const Home = mongoose.model("Home", HomeSchema);

// use this function to populate homes collection once

async function populateHome() {
  try {
    const spotlightData = spotlightTemplate.map((item) => {
      return item;
    });
    console.log(spotlightData);
    const home = new Home({
      carouselImages,
      category,
      spotlights: spotlightData,
    });
    const resp = await home.save();
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { Home, populateHome };
