const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require("../models/Patients");

router.get("/active", async (req, res) => {
  // Find all active/critical patients
  const activePatients = await Patient.find({
    "visit.medical.state": { $in: ["active", "critical"] },
  });
  res.status(200).json(activePatients);
});

router.get("/all", async (req, res) => {
  // Find all patients
  const allPatients = await Patient.find({});
  res.status(200).json(allPatients);
});

router.get("/search", async (req, res) => {
  let patientsArr = await Patient.find({});
  let filteredArr = patientsArr.filter((item) => {
    return item.name.indexOf(req.query.q) > -1;
  });
  if (!filteredArr.length) filteredArr = { message: "No results, Try Again." };
  res.json(filteredArr);
});

module.exports = router;
