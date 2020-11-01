const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const UserRouter = require("./Routes/UserRouter");
const AuthRouter = require("./Routes/AuthRouter");
const mongoose = require("mongoose");
const CONSTANTS = require("./constants");

mongoose.connect(
  CONSTANTS.mongodbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) throw err;
    console.log("Successfully connected to mongo db");
  }
);

app.get("/", function (req, res) {
  res.send("Welcome to API!");
});
app.use("/static", express.static("AssetImages"));
app.use("/", cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.listen(4000);

module.exports = app;
