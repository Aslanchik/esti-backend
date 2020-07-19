const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const verify = require("../middleware/auth-check");
const Patient = require("../models/Patients");

router.get("/active", verify, async (req, res) => {
  // Find all active/critical patients

  const unfilteredActivePatients = await Patient.find({
    "visit.medical.state": { $in: ["active", "critical"] },
  });

  res.status(200).json(unfilteredActivePatients);
});

router.get("/all", verify, async (req, res) => {
  // Find all patients
  const allPatients = await Patient.find({});
  res.status(200).json(allPatients);
});

router.get("/search/:param", verify, async (req, res) => {
  const param = req.params.param;
  let patientsArr = await Patient.find({
    $or: [
      { fname: { $regex: `.*${param}.*` } },
      { lname: { $regex: `.*${param}.*` } },
    ],
  });
  res.status(200).json(patientsArr);
});

router.patch("/updateState", verify, async (req, res) => {
  const { govId, visitId, newState } = req.body;

  const patientDocument = await Patient.findOne({
    govId: govId,
  });

  for (let visit of patientDocument.visit) {
    if (visit._id == visitId) {
      visit.medical[0].state = newState;
    }
  }
  try {
    const savedPatient = await patientDocument.save();
    res.status(200).json({ message: "Success!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/updateCompletedTask", verify, async (req, res) => {
  const {
    govId,
    task: { title, isComplete, type },
  } = req.body;

  const patientDocument = await Patient.findOne({
    govId: govId,
  });

  let visitToUpdate = "";

  for (let visit of patientDocument.visit) {
    const { procedures, tests } = visit.medical[0].treatmentPlan[0].tasks[0];
    if (type === "test") {
      tests.map((test) => {
        if (test.title === title) {
          test.isComplete = isComplete;
          return test;
        }
      });
    }
    if (type === "procedure") {
      procedures.map((procedure) => {
        if (procedure.title === title) {
          procedure.isComplete = isComplete;
          return procedure;
        }
      });
    }
    visitToUpdate = visit;
  }
  try {
    const updatedPatientDocument = await Patient.findOneAndUpdate(
      {
        govId: govId,
        "visit._id": visitToUpdate._id,
      },
      { $set: { visit: visitToUpdate } }
    );
    res.status(200).json(updatedPatientDocument);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
