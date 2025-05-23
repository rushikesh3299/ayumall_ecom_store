const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const initializeConnectionToDb = require("./db/db.connect.js");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

initializeConnectionToDb();

app.get("/", (req, res) => {
  res.send("server started");
});

app.use("/products", require("./router/public/products.route.js"));
app.use("/auth", require("./router/public/users.route.js"));
app.use("/profile", require("./router/protected/profile.route.js"));
app.use("/cart", require("./router/protected/cart.route.js"));
app.use("/wishlist", require("./router/protected/wishlist.route.js"));

app.listen(3000, () => {
  console.log("server started");
});
