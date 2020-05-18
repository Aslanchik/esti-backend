const mongoose = require("mongoose");

const PersonnelSchema = mongoose.Schema(
  {
    _id: { type: Number, required: true, min: 100000000, max: 999999999 },
    full_name: { type: String, required: true, max: 255 },
    email: { type: String, required: true },
    password: { type: String, required: true, max: 1024, min: 6 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Personnel", PersonnelSchema);
