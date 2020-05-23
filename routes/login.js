const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Staff = require("../models/Staff");
const { logVal } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

router.post("/", async (req, res) => {
  //VALIDATE THE DATA BEFORE WE MAKE NEW Staff
  const { error } = logVal(req.body);
  if (error) return res.status(400).send(error.details[0]);
  //CHECK IF ID EXISTS IN DB
  const person = await Staff.findOne({ _id: req.body._id });
  if (!person)
    return res.status(400).send("ID is not registered in our system!");

  //CHECK IF PASS CORRECT
  const validPass = await bcrypt.compare(req.body.password, person.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //CREATE AND ASSIGN JSON WEB TOKEN
  const token = jwt.sign({ _id: person.password }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
