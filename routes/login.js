const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Staff = require("../models/Staff");
const { logVal } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/* const dotenv = require("dotenv").config(); */

router.post("/", async (req, res) => {
  const { password, govId } = req.body;
  //Validate staff login
  const { error } = logVal(req.body);
  if (error) return res.status(401).json(error.details[0]);

  //CHECK IF ID EXISTS IN DB
  const person = await Staff.findOne({ govId: govId });
  if (!person)
    return res.status(401).json({ message: "ID is not recognized." });

  //CHECK IF PASS CORRECT
  const validPass = await bcrypt.compare(password, person.password);
  if (!validPass)
    return res.status(401).json({ message: "Password is incorrect." });

  //CREATE AND ASSIGN JSON WEB TOKEN
  const token = jwt.sign({ govId: person.govId }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({
    token: token,
    expiresIn: 3600,
    fullName: `${person.fname} ${person.lname}`,
  });
});

module.exports = router;
