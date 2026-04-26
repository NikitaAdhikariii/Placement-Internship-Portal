const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  skills: { type: [String], default: [] },
  branch: { type: String }
}, { strict: false });

module.exports = mongoose.model("Job", jobSchema);
