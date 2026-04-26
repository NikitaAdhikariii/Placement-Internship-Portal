const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Job = require("../models/Job");
const Application = require("../models/Application");
const Student = require("../models/Student");
const Trie = require("../utils/trie");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/jobs/:userId", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/apply", async (req, res) => {
  try {
    const { studentId, jobId } = req.body;
    const existing = await Application.findOne({ studentId, jobId });
    if (existing) return res.status(400).json({ message: "Already applied" });
    const app = new Application({ studentId, jobId });
    await app.save();
    res.json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/upload-resume/:userId", upload.single("resume"), async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.userId, { resume: req.file.filename });
    res.json({ message: "Resume uploaded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || "";
    const jobs = await Job.find();
    const trie = new Trie();
    jobs.forEach(job => {
      if (job.company) trie.insert(job.company.toLowerCase());
      if (job.title) trie.insert(job.title.toLowerCase());
    });
    const suggestions = trie.searchPrefix(query);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ================= ELIGIBILITY CHECK =================
router.post("/check-eligibility", async (req, res) => {
  try {
    const { skills = [], cgpa = 0, branch = "" } = req.body;
    const studentSkills = skills.map(s => s.toLowerCase());

    const jobs = await Job.find();

    const results = jobs.map(job => {
      const jobSkills = (job.skills || []).map(s => s.toLowerCase());
      const matched = jobSkills.filter(s => studentSkills.includes(s));
      const score = jobSkills.length > 0
        ? Math.round((matched.length / jobSkills.length) * 100)
        : 0;

      return {
        jobId: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        requiredSkills: job.skills,
        matchedSkills: matched,
        missingSkills: jobSkills.filter(s => !studentSkills.includes(s)),
        matchScore: score,
        eligible: score >= 60,
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ================= PARSE RESUME SKILLS =================
const fs = require("fs");
const pdfParse = require("pdf-parse");

router.post("/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text.toLowerCase();

    const skillKeywords = [
      "react", "node.js", "nodejs", "python", "java", "javascript", "typescript",
      "c++", "c#", "go", "golang", "ruby", "swift", "kotlin", "php", "rust",
      "mongodb", "postgresql", "mysql", "sql", "redis", "oracle",
      "aws", "azure", "docker", "kubernetes", "terraform", "jenkins",
      "django", "flask", "spring", "spring boot", "express", "graphql",
      "tensorflow", "pytorch", "machine learning", "deep learning", "nlp",
      "html", "css", "tailwind", "bootstrap", "angular", "vue",
      "linux", "git", "kafka", "hadoop", "spark",
      "verilog", "vhdl", "matlab", "embedded", "vlsi",
      "figma", "adobe xd", "selenium", "jira", "sap", "excel"
    ];

    const found = skillKeywords.filter(skill => text.includes(skill.toLowerCase()));

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ skills: found, rawText: text.substring(0, 500) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
