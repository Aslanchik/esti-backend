const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Staff = require("../models/Staff");
const { regVal } = require("../validation");
const bcrypt = require("bcryptjs");

// ADD A NEW Staff TO DATABASE
router.post("/", async (req, res) => {
  const { govId, fname, lname, email, password } = req.body;
  //VALIDATE THE DATA BEFORE WE MAKE NEW Staff
  const { error } = regVal(req.body);
  if (error) return res.status(400).send(error.details[0]);

  //CHECK IF USER IS ALREADY IN DATABASE
  const idExists = await Staff.findOne({ govId: govId });
  const emailExists = await Staff.findOne({ email: email });

  if (idExists) return res.status(400).send("id");
  if (emailExists) return res.status(400).send("email");

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  //CREATE NEW Staff
  const staff = new Staff({
    govId: govId,
    fname: fname,
    lname: lname,
    email: email,
    password: hashPass,
  });

  //SAVE NEW STAFF INTO DATABASE
  try {
    const savedStaff = await staff.save();
    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
