const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");
const Notification = require("../models/Notification");

router.post("/post-job", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json({ message: "Job posted successfully", job });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/my-jobs/:company", async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.params.company }).sort({ _id: -1 });
    res.json(jobs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/applicants/:jobId", async (req, res) => {
  try {
    const apps = await Application.find({ jobId: req.params.jobId }).sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/all-applicants/:company", async (req, res) => {
  try {
    const apps = await Application.find({ company: req.params.company }).sort({ appliedAt: -1 });
    res.json(apps);
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
        ? "🎉 Congratulations! You have been shortlisted for " + app.jobTitle + " at " + app.company + "!"
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

module.exports = router;
