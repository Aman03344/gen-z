const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB CONNECT ${conn.connection.name}`.bgGreen);
  } catch (error) {
    console.log(`DB CONNECTION FAILED ${error}`.bgRed);
  }
};

module.exports = connectDB;
