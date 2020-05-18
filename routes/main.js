const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// VERIFY USING JWT
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "My first post",
      description: "random data you shouldnt access",
    },
  });
});

module.exports = router;
