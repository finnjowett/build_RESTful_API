const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (e) => {
  console.log(e);
});
db.once("open", () => {
  console.log("connected");
});

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);
app.listen(3000, () => {
  console.log("Server has started");
});
