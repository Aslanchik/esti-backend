const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public/" });
});

module.exports = router;
