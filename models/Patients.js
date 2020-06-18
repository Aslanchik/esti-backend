const mongoose = require("mongoose");

const TasksVisitSchema = new mongoose.Schema({
  procedures: { type: String, max: 255 },
  tests: { type: String, max: 255 },
});

const TreatmentPlanVisitSchema = new mongoose.Schema({
  diagnosis: { type: String, required: true, max: 255 },
  medication: { type: String, max: 255 },
  tasks: [TasksVisitSchema],
  notes: { type: String, required: true, max: 500 },
});

const VitalsVisitSchema = new mongoose.Schema({
  pulse: { type: Number, required: true, max: 200 },
  bp: { type: String, required: true, max: 200 },
  temp: { type: Number, required: true, max: 200 },
  weight: { type: Number, required: true, max: 200 },
  bloodSugar: { type: Number, required: true, max: 600 },
  respRate: { type: Number, required: true, max: 60 },
});

const HistoryVisitSchema = new mongoose.Schema({
  isThere: { type: Boolean },
  description: { type: String, max: 255 },
});

const BeforeVisitSchema = new mongoose.Schema({
  hasIt: { type: Boolean },
  description: { type: String, max: 255 },
});

const HabitsVisitSchema = new mongoose.Schema({
  smoking: { type: Boolean, required: true },
  drinking: { type: Boolean, required: true },
  drugs: { type: Boolean, required: true },
  drugsDescription: { type: String, max: 255 },
});

const MedicalVisitSchema = new mongoose.Schema({
  state: { type: String, required: true },
  allergies: { type: String, required: true, max: 255 },
  habits: [HabitsVisitSchema],
  diet: { type: String },
  reasonOfVisit: { type: String, required: true, max: 255 },
  caseStory: { type: String, required: true, max: 255 },
  symptoms: { type: String, required: true, max: 255 },
  hasHappenedBefore: [BeforeVisitSchema],
  history: [HistoryVisitSchema],
  vitals: [VitalsVisitSchema],
  treatmentPlan: [TreatmentPlanVisitSchema],
});

const VisitSchema = new mongoose.Schema(
  {
    how: { type: String },
    time: { type: String },
    medical: [MedicalVisitSchema],
  },
  { timestamps: true }
);

const PatientSchema = mongoose.Schema({
  govId: { type: String, required: true, min: 100000000, max: 999999999 },
  fname: { type: String, required: true, max: 255 },
  lname: { type: String, required: true, max: 255 },
  birthDate: { type: String, required: true, max: 10 },
  phone: { type: String, required: true, min: 100000000, max: 999999999 },
  email: { type: String, required: true },
  address: { type: String, required: true },
  visit: [VisitSchema],
});

const Tasks = mongoose.model("Tasks", TasksVisitSchema);
const Vitals = mongoose.model("Vitals", VitalsVisitSchema);
const History = mongoose.model("History", HistoryVisitSchema);
const Before = mongoose.model("Before", BeforeVisitSchema);
const Habits = mongoose.model("Habits", HabitsVisitSchema);
const TreatmentPlan = mongoose.model("TreatmentPlan", TreatmentPlanVisitSchema);
const Medical = mongoose.model("Medical", MedicalVisitSchema);
module.exports = mongoose.model("Visit", VisitSchema);
module.exports = mongoose.model("Patient", PatientSchema);
