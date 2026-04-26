const router = require("express").Router();
const Student = require("../models/Student");

// Create profile
router.post("/profile", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

// Get all opportunities (dummy)
router.get("/jobs", (req, res) => {
  res.json([{ company: "Google", role: "Intern" }]);
});

module.exports = router;