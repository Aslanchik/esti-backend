const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require("../models/Patients");

router.get("/active", async (req, res) => {
  // Find all active/critical patients
  const activePatients = await Patient.find({
    "visit.medical.state": { $in: ["active", "critical"] },
  });
  res.json(activePatients);
});

router.get("/discharged", async (req, res) => {
  // Find all active/critical patients
  const activePatients = await Patient.find({
    "visit.medical.state": "discharged",
  });
  res.json(activePatients);
});

module.exports = router;
