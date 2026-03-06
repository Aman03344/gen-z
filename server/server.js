const express = require("express");
const connectDB = require("./config/dbConfig");
const errhandler = require("./middlewares/errHandler");
// const path = require("path")
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("colors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(errhandler);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: "https://aarunya-nine.vercel.app",
    credentials: true,
  }),
);

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/order", require("./routes/orderRoute"));

app.use("/api/admin", require("./routes/adminRoute"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Cothes API's" });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`.cyan);
});
