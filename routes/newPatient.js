const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require("../models/Patients");

// ADD A NEW PATIENT TO DATABASE
router.post("/", async (req, res) => {
  //CHECK IF PATIENT IS ALREADY IN DATABASE
  const patientDocument = await Patient.findOne({ govId: req.body.govId });

  // IF PATIENT IS ALREADY IN THE DATABASE JUST ADD THE CURRENT VISIT
  if (patientDocument) {
    patientDocument.visit.push({
      how: req.body.visit.how,
      time: req.body.visit.time,
      attendingNurse: req.body.visit.attendingNurse,
      medical: {
        state: req.body.visit.medical.state,
        allergies: req.body.visit.medical.allergies,
        habits: {
          smoking: req.body.visit.medical.habits.smoking,
          drinking: req.body.visit.medical.habits.drinking,
          drugs: req.body.visit.medical.habits.drugs,
          drugsDescription: req.body.visit.medical.habits.drugsDescription,
        },
        reasonOfVisit: req.body.visit.medical.reasonOfVisit,
        caseStory: req.body.visit.medical.caseStory,
        symptoms: req.body.visit.medical.symptoms,
        hasHappenedBefore: {
          hasIt: req.body.visit.medical.hasHappenedBefore.hasIt,
          description: req.body.visit.medical.hasHappenedBefore.description,
        },
        history: {
          isThere: req.body.visit.medical.history.isThere,
          description: req.body.visit.medical.history.description,
        },
        vitals: {
          pulse: req.body.visit.medical.vitals.pulse,
          bp: req.body.visit.medical.vitals.bp,
          temp: req.body.visit.medical.vitals.temp,
          weight: req.body.visit.medical.vitals.weight,
          bloodSugar: req.body.visit.medical.vitals.bloodSugar,
          respRate: req.body.visit.medical.vitals.respRate,
        },
        treatmentPlan: {
          diagnosis: req.body.visit.medical.treatmentPlan.diagnosis,
          medication: req.body.visit.medical.treatmentPlan.medication,
          tasks: {
            procedures: req.body.visit.medical.treatmentPlan.tasks.procedures,
            tests: req.body.visit.medical.treatmentPlan.tasks.tests,
          },
          notes: req.body.visit.medical.treatmentPlan.notes,
        },
      },
    });

    try {
      const savedVisit = await patientDocument.save();
      res.json({
        patient: `Patient ${patient.fname} ${patient.lname}'s Visit Added Successfully!`,
      });
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    //CREATE NEW Patient
    const patient = new Patient({
      govId: req.body.govId,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      birthYear: req.body.birthYear,
      phone: req.body.phone,
      address: req.body.address,
      visit: {
        how: req.body.visit.how,
        time: req.body.visit.time,
        attendingNurse: req.body.visit.attendingNurse,
        medical: {
          state: req.body.visit.medical.state,
          allergies: req.body.visit.medical.allergies,
          habits: {
            smoking: req.body.visit.medical.habits.smoking,
            drinking: req.body.visit.medical.habits.drinking,
            drugs: req.body.visit.medical.habits.drugs,
            drugsDescription: req.body.visit.medical.habits.drugsDescription,
          },
          reasonOfVisit: req.body.visit.medical.reasonOfVisit,
          caseStory: req.body.visit.medical.caseStory,
          symptoms: req.body.visit.medical.symptoms,
          hasHappenedBefore: {
            hasIt: req.body.visit.medical.hasHappenedBefore.hasIt,
            description: req.body.visit.medical.hasHappenedBefore.description,
          },
          history: {
            isThere: req.body.visit.medical.history.isThere,
            description: req.body.visit.medical.history.description,
          },
          vitals: {
            pulse: req.body.visit.medical.vitals.pulse,
            bp: req.body.visit.medical.vitals.bp,
            temp: req.body.visit.medical.vitals.temp,
            weight: req.body.visit.medical.vitals.weight,
            bloodSugar: req.body.visit.medical.vitals.bloodSugar,
            respRate: req.body.visit.medical.vitals.respRate,
          },
          treatmentPlan: {
            diagnosis: req.body.visit.medical.treatmentPlan.diagnosis,
            medication: req.body.visit.medical.treatmentPlan.medication,
            tasks: {
              procedures: req.body.visit.medical.treatmentPlan.tasks.procedures,
              tests: req.body.visit.medical.treatmentPlan.tasks.tests,
            },
            notes: req.body.visit.medical.treatmentPlan.notes,
          },
        },
      },
    });

    //SAVE NEW Patient INTO DATABASE
    try {
      const savedPatient = await patient.save();
      res.json({
        patient: `Patient ${patient.fname} ${patient.lname} Added Successfully!`,
      });
    } catch (err) {
      res.json({ message: err });
    }
  }

  //HASH THE ID
  /* const salt = await bcrypt.genSalt(10);
  const hashId = await bcrypt.hash(req.body.govId, salt); */
});

module.exports = router;
