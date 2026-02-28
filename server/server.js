const express = require("express");
const connectDB = require("./config/dbConfig");
const errhandler = require("./middlewares/errHandler");
require("colors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(errhandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Cothes API's" });
});

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/cart", require("./routes/cartRoute"));

app.use("/api/admin", require("./routes/adminRoute"));

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`.cyan);
});
