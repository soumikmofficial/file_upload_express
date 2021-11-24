require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./config/connect");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const productRouter = require("./routes/productRoutes");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const app = express();

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log(`Shutting down server due to uncaught exception rejection.`);
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.use(express.static("./public"));
// ............................body parsers...........................
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// ............................routes............................
app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
  res.send("<h2>The home page<h2/>");
});

// ............................error handlers............................
app.use(errorHandlerMiddleware);

// ..................................server and database...........................
connectDB();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`server up on port port`));

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log(`Shutting down server due to unhandled promise rejection.`);
  server.close(() => {
    process.exit(1);
  });
});
