const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Personnel = require("../models/Personnel");
const { regVal } = require("../validation");
const bcrypt = require("bcryptjs");

// ADD A NEW PERSONNEL TO DATABASE
router.post("/", async (req, res) => {
  //VALIDATE THE DATA BEFORE WE MAKE NEW PERSONNEL
  const { error } = regVal(req.body);
  if (error) return res.status(400).send(error.details[0]);

  //CHECK IF USER IS ALREADY IN DATABASE
  const idExists = await Personnel.findOne({ _id: req.body._id });
  const emailExists = await Personnel.findOne({ email: req.body.email });
  if (idExists) return res.status(400).send("This ID is already registered");
  if (emailExists)
    return res.status(400).send("This EMAIL is already registered");

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  //CREATE NEW PERSONNEL
  const personnel = new Personnel({
    _id: req.body._id,
    full_name: req.body.full_name,
    email: req.body.email,
    password: hashPass,
  });

  //SAVE NEW PERSONNEL INTO DATABASE
  try {
    const savedPersonnel = await personnel.save();
    res.json({ personnel: personnel.full_name });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
