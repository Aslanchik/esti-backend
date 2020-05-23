const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({});

module.exports = mongoose.model("Patient", PatientSchema);
