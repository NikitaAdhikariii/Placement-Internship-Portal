const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fsm = require("fs");
const pdfParse = require("pdf-parse");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Trie = require("../utils/trie");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/jobs/:userId", async (req, res) => {
  try { res.json(await Job.find({}).sort({ _id: -1 })); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/apply", async (req, res) => {
  try {
    const { studentId, studentName, studentEmail, jobId } = req.body;
    const existing = await Application.findOne({ studentId, jobId });
    if (existing) return res.status(400).json({ message: "Already applied" });
    const job = await Job.findById(jobId);
    await new Application({
      studentId, studentName, studentEmail, jobId,
      jobTitle: job ? job.title : "",
      company: job ? job.company : "",
      status: "pending", appliedAt: new Date()
    }).save();
    res.json({ message: "Applied successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/my-applications/:userId", async (req, res) => {
  try {
    const apps = await Application.find({ studentId: req.params.userId }).sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/upload-resume/:userId", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.json({ message: "Resume uploaded", file: req.file.filename });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const text = (await pdfParse(fsm.readFileSync(req.file.path))).text.toLowerCase();
    const keywords = ["java","python","javascript","typescript","c++","c#","go","ruby","swift",
      "kotlin","php","rust","react","node.js","nodejs","express","django","flask","spring",
      "graphql","angular","vue","mongodb","postgresql","mysql","sql","redis","oracle","aws",
      "azure","docker","kubernetes","tensorflow","pytorch","machine learning","deep learning",
      "nlp","html","css","tailwind","bootstrap","linux","git","kafka","hadoop","spark",
      "verilog","vhdl","matlab","embedded","vlsi","figma","selenium","jira","sap","excel"];
    const found = keywords.filter(s => text.includes(s));
    fsm.unlinkSync(req.file.path);
    res.json({ skills: found });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/check-eligibility", async (req, res) => {
  try {
    const { skills = [] } = req.body;
    const studentSkills = skills.map(s => s.toLowerCase());
    const results = (await Job.find({})).map(job => {
      const jobSkills = (job.skills || []).map(s => s.toLowerCase());
      const matchedSkills = jobSkills.filter(s => studentSkills.includes(s));
      const missingSkills = jobSkills.filter(s => !studentSkills.includes(s));
      const matchScore = jobSkills.length > 0 ? Math.round((matchedSkills.length / jobSkills.length) * 100) : 0;
      return { title: job.title, company: job.company, salary: job.salary, location: job.location,
        requiredSkills: job.skills, matchedSkills, missingSkills, matchScore, eligible: matchScore >= 60 };
    });
    results.sort((a, b) => b.matchScore - a.matchScore);
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/search", async (req, res) => {
  try {
    const query = (req.query.q || "").toLowerCase();
    const jobs = await Job.find({});
    const trie = new Trie();
    jobs.forEach(job => {
      if (job.company) trie.insert(job.company.toLowerCase());
      if (job.title) trie.insert(job.title.toLowerCase());
    });
    res.json(trie.searchPrefix(query));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
