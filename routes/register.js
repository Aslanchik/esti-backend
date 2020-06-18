const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Staff = require("../models/Staff");
const { regVal } = require("../validation");
const bcrypt = require("bcryptjs");

// ADD A NEW Staff TO DATABASE
router.post("/", async (req, res) => {
  //VALIDATE THE DATA BEFORE WE MAKE NEW Staff
  const { error } = regVal(req.body);
  if (error) return res.status(400).send(error.details[0]);

  //CHECK IF USER IS ALREADY IN DATABASE
  const idExists = await Staff.findOne({ govId: req.body.govId });
  const emailExists = await Staff.findOne({ email: req.body.email });

  if (idExists) return res.status(400).send("This ID is already registered");
  if (emailExists)
    return res.status(400).send("This EMAIL is already registered");

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  //CREATE NEW Staff
  const staff = new Staff({
    govId: req.body.govId,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
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
