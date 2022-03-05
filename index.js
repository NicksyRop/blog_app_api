const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dontenv = require("dotenv");
dontenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log(`Server runnimg on http://localhost:5000`);
});
