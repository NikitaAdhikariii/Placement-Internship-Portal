const mongoose = require("mongoose");
const ApplicationSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  jobId: String,
  jobTitle: String,
  company: String,
  status: { type: String, default: "pending", enum: ["pending","shortlisted","rejected"] },
  appliedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Application", ApplicationSchema);
