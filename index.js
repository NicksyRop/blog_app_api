const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");

const dontenv = require("dotenv");
dontenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(5000, () => {
  console.log(`Server runnimg on http://localhost:5000`);
});
