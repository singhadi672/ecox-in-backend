const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;

const { populateHome } = require("./model/home.model");
const { populateProducts } = require("./model/product.model");
const { dbConnection } = require("./db/connection.db");

const productRouter = require("./router/product.router");
const homeRouter = require("./router/homeData.router");
const userRouter = require("./router/user.router");
const cartRouter = require("./router/cart.router");
const wishlistRouter = require("./router/wishlist.router");

app.use(express.json());
app.use(cors());

dbConnection();

app.use("/products", productRouter);
app.use("/home", homeRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

app.get("/", (req, res) => {
  res.send("apis for ecox-in ©Aditya Singh");
});

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "the required page is not found" });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
