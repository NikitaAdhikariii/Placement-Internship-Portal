const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: String,
  role: String,
  package: String,
  deadline: String
});

module.exports = mongoose.model("Job", JobSchema);