const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Notification = require("../models/Notification");

router.get("/stats", async (req, res) => {
  try {
    const students     = await User.countDocuments({ role: "student" });
    const companies    = await User.countDocuments({ role: "company" });
    const jobs         = await Job.countDocuments();
    const applications = await Application.countDocuments();
    const jobsList     = await Job.find().sort({ _id: -1 }).limit(100);
    const usersList    = await User.find({}, "-password").limit(100);
    const appsList     = await Application.find().sort({ appliedAt: -1 }).limit(100);
    res.json({ stats: { students, companies, jobs, applications }, jobs: jobsList, users: usersList, applications: appsList });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/application/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!app) return res.status(404).json({ message: "Not found" });
    await new Notification({
      userId: app.studentId,
      message: status === "shortlisted"
        ? "🎉 You have been shortlisted for " + app.jobTitle + " at " + app.company + "!"
        : "❌ Your application for " + app.jobTitle + " at " + app.company + " was not selected.",
      type: status === "shortlisted" ? "success" : "danger"
    }).save();
    res.json({ message: "Updated", app });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/job/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/notify-all", async (req, res) => {
  try {
    const { message } = req.body;
    const users = await User.find({}, "_id");
    await Notification.insertMany(users.map(u => ({ userId: u._id.toString(), message, type: "info" })));
    res.json({ message: "Sent to all" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
