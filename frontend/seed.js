const mongoose = require("mongoose");
const Job = require("./models/Job");
require("dotenv").config();

const jobs = [
  { title: "Frontend Developer", company: "Google", location: "Bangalore", salary: 120000, skills: ["React", "CSS"], branch: "CSE" },
  { title: "Backend Developer", company: "Google", location: "Hyderabad", salary: 130000, skills: ["Node.js", "MongoDB"], branch: "CSE" },
  { title: "Data Analyst", company: "Microsoft", location: "Pune", salary: 100000, skills: ["Python", "Excel"], branch: "IT" },
  { title: "Cloud Engineer", company: "Microsoft", location: "Noida", salary: 115000, skills: ["Azure", "Docker"], branch: "CSE" },
  { title: "ML Engineer", company: "Amazon", location: "Bangalore", salary: 140000, skills: ["Python", "TensorFlow"], branch: "CSE" },
  { title: "DevOps Engineer", company: "Amazon", location: "Chennai", salary: 125000, skills: ["AWS", "Jenkins"], branch: "IT" },
  { title: "Android Developer", company: "Infosys", location: "Mumbai", salary: 90000, skills: ["Java", "Kotlin"], branch: "CSE" },
  { title: "UI/UX Designer", company: "Wipro", location: "Delhi", salary: 85000, skills: ["Figma", "Adobe XD"], branch: "Design" },
  { title: "Full Stack Developer", company: "TCS", location: "Kolkata", salary: 95000, skills: ["React", "Node.js"], branch: "CSE" },
  { title: "Cybersecurity Analyst", company: "HCL", location: "Bangalore", salary: 110000, skills: ["Networking", "Linux"], branch: "IT" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    await Job.deleteMany({});
    console.log("Old jobs cleared 🗑️");

    await Job.insertMany(jobs);
    console.log("10 jobs inserted ✅");

    mongoose.connection.close();
    console.log("Done! Now run npm run dev 🚀");
  } catch (err) {
    console.error("Error:", err);
  }
}

seed();