const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  studentId: String,
  jobId: String,
  status: {
    type: String,
    default: "pending" // pending, shortlisted, rejected
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Application", ApplicationSchema);