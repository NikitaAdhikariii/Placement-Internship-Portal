const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  branch: String,
  cgpa: Number,
  skills: [String],
  resume: String
});

module.exports = mongoose.model("Student", StudentSchema);