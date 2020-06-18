const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema(
  {
    govId: { type: Number, required: true, min: 100000000, max: 999999999 },
    fname: { type: String, required: true, max: 255 },
    lname: { type: String, required: true, max: 255 },
    email: { type: String, required: true },
    password: { type: String, required: true, max: 1024, min: 6 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);
