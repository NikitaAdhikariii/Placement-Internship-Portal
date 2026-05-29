const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

/* GET ALL JOBS */
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ _id: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* POST JOB */
router.post("/post", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();

    if (global.io) {
      global.io.emit("newNotification", {
        message: `New job posted: ${job.title}`,
      });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE JOB */
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;