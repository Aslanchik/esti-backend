const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const verify = require("../middleware/auth-check");
const Patient = require("../models/Patients");

// Find all active/critical patients
router.get("/active", verify, async (req, res) => {
  const activePatients = await Patient.find({
    "visit.medical.state": { $in: ["active", "critical"] },
  });

  res.status(200).json(activePatients);
});

// Find all patients
router.get("/all", verify, async (req, res) => {
  const allPatients = await Patient.find({});
  res.status(200).json(allPatients);
});

// Find a specific patient
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

//UPDATE STATE OF A PATIENT IN A VISIT
router.patch("/updateState", verify, async (req, res) => {
  const { govId, visitId, newState } = req.body;

  const patientDocument = await Patient.findOne({
    govId: govId,
  });
  // LOOP THROUGH VISITS AND UPDATE THE STATE IN THE CORRECT VISIT
  for (let visit of patientDocument.visit) {
    if (visit._id == visitId) {
      visit.medical[0].state = newState;
    }
  }
  // SAVE PATIENT
  try {
    const savedPatient = await patientDocument.save();
    res.status(200).json({ message: "Success!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// COMPLETE A TASK
router.patch("/updateCompletedTask", verify, async (req, res) => {
  const {
    govId,
    task: { title, isComplete, type },
  } = req.body;

  const patientDocument = await Patient.findOne({
    govId: govId,
  });

  let visitToUpdate = "";
  // LOOP THROUGH TASKS AND SET THE COMPLETED ONE TO COMPLETE
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
  // UPDATE THE VISIT IN WHICH THE TASK WAS COMPLETED
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

// EDIT VISIT
router.patch("/editVisit", verify, async (req, res) => {
  const { govId, visitId, medical } = req.body;

  const patientDocument = await Patient.findOne({ govId: govId });
  // LOOP THROUGH VISITS AND WHEN A VISIT MATCHES THE THE VISITID UPDATE IT WITH MEDICAL DATA
  for (let visit of patientDocument.visit) {
    if (visit._id.toString() === visitId) {
      visit.medical = medical;
      break;
    }
  }
  // SAVE EDITED PATIENT
  try {
    const editedPatient = await patientDocument.save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// DELETE PATIENT FROM DB
router.post("/delete", async (req, res) => {
  const { govId, visitId } = req.body;

  const patientDocument = await Patient.findOne({
    govId: govId,
  });
  // IF PATIENT HAS MULTIPLE VISITS, DELETE ONLY THE SELECTED ONE
  if (patientDocument.visit[1]) {
    const filteredVisits = patientDocument.visit.filter(
      (visit) => visit._id.toString() !== visitId
    );
    try {
      const updatedPatientDocument = await Patient.findOneAndUpdate(
        {
          govId: govId,
        },
        { $set: { visit: filteredVisits } }
      );
      res.status(200).json(updatedPatientDocument);
    } catch (err) {
      res.status(400).json({ message: err });
    }
    return;
  }
  //IF PATIENT HAS NO VISITS - DELETE THE PATIENT COMPLETELY
  try {
    const deletedPatient = await Patient.deleteOne({ govId: govId });
    res.status(200).json({ deleted: deletedPatient });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
