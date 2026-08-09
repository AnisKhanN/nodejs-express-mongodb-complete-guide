const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes.js");
const musicRoutes = require("./routes/musicRoutes.js");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: "Multer upload error",
      error: err.message,
      code: err.code,
      field: err.field,
    });
  }
  if (err) {
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error",
    });
  }
  next();
});

module.exports = app;
