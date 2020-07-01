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

router.get("/search/:param", async (req, res) => {
  const param = req.params.param;
  let patientsArr = await Patient.find({
    $or: [
      { fname: { $regex: `.*${param}.*` } },
      { lname: { $regex: `.*${param}.*` } },
    ],
  });

  res.status(200).json(patientsArr);
});

module.exports = router;
