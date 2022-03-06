const express = require("express");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const catRouter = require("./routes/categories");

const dontenv = require("dotenv");
dontenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from express");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Database connected successfully"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  // req.file is the `file` file
  // req.name will hold the text fields, if there were any

  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", catRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server runnimg on http://localhost:5000`);
});
