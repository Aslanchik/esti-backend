const mongoose = require("mongoose");

const TasksVisitSchema = new mongoose.Schema({
  procedures: { type: String, maxlength: 255 },
  tests: { type: String, maxlength: 255 },
});

const TreatmentPlanVisitSchema = new mongoose.Schema({
  diagnosis: { type: String, required: true, maxlength: 255 },
  medication: { type: String, maxlength: 255 },
  tasks: [TasksVisitSchema],
  notes: { type: String, maxlength: 500 },
});

const VitalsVisitSchema = new mongoose.Schema({
  pulse: { type: Number, required: true, max: 300 },
  bp: { type: String, required: true, maxlength: 200 },
  temp: { type: Number, required: true, max: 80 },
  weight: { type: Number, required: true, max: 600 },
  bloodSugar: { type: Number, required: true, max: 600 },
  respRate: { type: Number, required: true, max: 60 },
});

const HistoryVisitSchema = new mongoose.Schema({
  isThere: { type: Boolean },
  description: { type: String, maxlength: 255 },
});

const BeforeVisitSchema = new mongoose.Schema({
  hasIt: { type: Boolean },
  description: { type: String, maxlength: 255 },
});

const HabitsVisitSchema = new mongoose.Schema({
  smoking: { type: Boolean, required: true },
  drinking: { type: Boolean, required: true },
  drugs: { type: Boolean, required: true },
  drugsDescription: { type: String, maxlength: 255 },
});

const MedicalVisitSchema = new mongoose.Schema({
  state: { type: String, required: true },
  allergies: { type: String, required: true, maxlength: 255 },
  habits: [HabitsVisitSchema],
  reasonOfVisit: { type: String, required: true, maxlength: 255 },
  caseStory: { type: String, required: true, maxlength: 255 },
  symptoms: { type: String, required: true, maxlength: 255 },
  hasHappenedBefore: [BeforeVisitSchema],
  history: [HistoryVisitSchema],
  vitals: [VitalsVisitSchema],
  treatmentPlan: [TreatmentPlanVisitSchema],
});

const VisitSchema = new mongoose.Schema(
  {
    how: { type: String },
    time: { type: String },
    attendingNurse: { type: String },
    medical: [MedicalVisitSchema],
  },
  { timestamps: true }
);

const PatientSchema = mongoose.Schema({
  govId: { type: String, required: true, minlength: 9, maxlength: 9 },
  fname: { type: String, required: true, maxlength: 255 },
  lname: { type: String, required: true, maxlength: 255 },
  birthYear: { type: Number, required: true, maxlength: 4 },
  phone: { type: String, required: true, minlength: 9, maxlength: 10 },
  email: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: true, maxlength: 255 },
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
