const router = require("express").Router();
const Job = require("../models/Job");

// Post job
router.post("/post", async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

// Get applicants (dummy)
router.get("/applicants", (req, res) => {
  res.json([{ name: "Nikita", status: "Applied" }]);
});

module.exports = router;