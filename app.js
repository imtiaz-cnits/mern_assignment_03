// Lib Import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

// cors open
app.use(cors());

// Security Implementation
app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
let limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Database Connection
const URI =
  "mongodb+srv://imtiazToDo:GJz1Bsi1d6IdfSTv@cluster0.tejpthq.mongodb.net/taskmern5";
const OPTION = { user: "", pass: "", autoIndex: true };
mongoose
  .connect(URI, OPTION)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// route Implement
app.use("/api", router);

// 404 not found Implement
app.use("*", (req, res) => {
  res.status(404).json({ data: "Not found" });
});

module.exports = app;
