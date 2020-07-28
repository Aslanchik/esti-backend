const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require("../models/Patients");

// ADD A NEW PATIENT TO DATABASE
router.post("/", async (req, res) => {
  const {
    govId,
    fname,
    lname,
    email,
    address,
    birthYear,
    phone,
    visit: {
      how,
      time,
      attendingNurse,
      medical: {
        state,
        allergies,
        habits: { smoking, drinking, drugs, drugsDescription },
        reasonOfVisit,
        caseStory,
        symptoms,
        hasHappenedBefore: { hasIt, description: hasHappenedDescription },
        history: { isThere, description: historyDescription },
        vitals: { pulse, bp, temp, weight, bloodSugar, respRate },
        treatmentPlan: {
          diagnosis,
          medication,
          tasks: {
            procedures: [...procedure],
            tests: [...test],
          },

          notes,
        },
      },
    },
  } = req.body;

  //CHECK IF PATIENT IS ALREADY IN DATABASE
  const patientDocument = await Patient.findOne({ govId: govId });

  // IF PATIENT IS ALREADY IN THE DATABASE JUST ADD THE CURRENT VISIT
  if (patientDocument) {
    patientDocument.visit.push({
      how: how,
      time: time,
      attendingNurse: attendingNurse,
      medical: {
        state: state,
        allergies: allergies,
        habits: {
          smoking: smoking,
          drinking: drinking,
          drugs: drugs,
          drugsDescription: drugsDescription,
        },
        reasonOfVisit: reasonOfVisit,
        caseStory: caseStory,
        symptoms: symptoms,
        hasHappenedBefore: {
          hasIt: hasIt,
          description: hasHappenedDescription,
        },

        history: {
          isThere: isThere,
          description: historyDescription,
        },

        vitals: {
          pulse: pulse,
          bp: bp,
          temp: temp,
          weight: weight,
          bloodSugar: bloodSugar,
          respRate: respRate,
        },

        treatmentPlan: {
          diagnosis: diagnosis,
          medication: medication,
          tasks: {
            procedures: procedure,
            tests: test,
          },

          notes: notes,
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
      govId: govId,
      fname: fname,
      lname: lname,
      email: email,
      birthYear: birthYear,
      phone: phone,
      address: address,
      visit: {
        how: how,
        time: time,
        attendingNurse: attendingNurse,
        medical: {
          state: state,
          allergies: allergies,
          habits: {
            smoking: smoking,
            drinking: drinking,
            drugs: drugs,
            drugsDescription: drugsDescription,
          },
          reasonOfVisit: reasonOfVisit,
          caseStory: caseStory,
          symptoms: symptoms,
          hasHappenedBefore: {
            hasIt: hasIt,
            description: hasHappenedDescription,
          },

          history: {
            isThere: isThere,
            description: historyDescription,
          },

          vitals: {
            pulse: pulse,
            bp: bp,
            temp: temp,
            weight: weight,
            bloodSugar: bloodSugar,
            respRate: respRate,
          },

          treatmentPlan: {
            diagnosis: diagnosis,
            medication: medication,
            tasks: {
              procedures: procedure,
              tests: test,
            },

            notes: notes,
          },
        },
      },
    });

    //SAVE NEW Patient INTO DATABASE
    try {
      const savedPatient = await patient.save();
      res.json({
        savedPatient,
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


