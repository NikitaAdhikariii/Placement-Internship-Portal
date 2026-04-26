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
  { title: "Cybersecurity Analyst", company: "HCL", location: "Bangalore", salary: 110000, skills: ["Networking", "Linux"], branch: "IT" },
  { title: "iOS Developer", company: "Apple", location: "Hyderabad", salary: 145000, skills: ["Swift", "Xcode"], branch: "CSE" },
  { title: "Software Engineer", company: "Meta", location: "Bangalore", salary: 160000, skills: ["React", "GraphQL"], branch: "CSE" },
  { title: "Data Scientist", company: "Netflix", location: "Mumbai", salary: 150000, skills: ["Python", "Spark"], branch: "CSE" },
  { title: "Site Reliability Engineer", company: "Twitter", location: "Pune", salary: 135000, skills: ["Kubernetes", "Go"], branch: "CSE" },
  { title: "Backend Engineer", company: "Uber", location: "Bangalore", salary: 140000, skills: ["Java", "Kafka"], branch: "CSE" },
  { title: "Data Engineer", company: "Flipkart", location: "Bangalore", salary: 120000, skills: ["Spark", "Hadoop"], branch: "IT" },
  { title: "Product Engineer", company: "Swiggy", location: "Bangalore", salary: 115000, skills: ["React", "Node.js"], branch: "CSE" },
  { title: "Platform Engineer", company: "Zomato", location: "Delhi", salary: 110000, skills: ["Python", "Django"], branch: "CSE" },
  { title: "Software Developer", company: "Paytm", location: "Noida", salary: 105000, skills: ["Java", "Spring"], branch: "CSE" },
  { title: "Cloud Architect", company: "IBM", location: "Bangalore", salary: 130000, skills: ["AWS", "Terraform"], branch: "CSE" },
  { title: "Systems Engineer", company: "Oracle", location: "Hyderabad", salary: 100000, skills: ["SQL", "Java"], branch: "CSE" },
  { title: "Network Engineer", company: "Cisco", location: "Bangalore", salary: 108000, skills: ["Networking", "CCNA"], branch: "ECE" },
  { title: "Embedded Engineer", company: "Qualcomm", location: "Hyderabad", salary: 125000, skills: ["C", "Embedded Systems"], branch: "ECE" },
  { title: "VLSI Engineer", company: "Intel", company: "Intel", location: "Bangalore", salary: 130000, skills: ["VHDL", "Verilog"], branch: "ECE" },
  { title: "Frontend Engineer", company: "Adobe", location: "Noida", salary: 118000, skills: ["JavaScript", "TypeScript"], branch: "CSE" },
  { title: "ML Researcher", company: "Samsung", location: "Bangalore", salary: 122000, skills: ["Python", "PyTorch"], branch: "CSE" },
  { title: "Software Engineer", company: "Accenture", location: "Mumbai", salary: 88000, skills: ["Java", ".NET"], branch: "IT" },
  { title: "Consultant", company: "Deloitte", location: "Delhi", salary: 92000, skills: ["SAP", "Excel"], branch: "IT" },
  { title: "Technology Analyst", company: "Cognizant", location: "Chennai", salary: 85000, skills: ["Java", "SQL"], branch: "IT" },
  { title: "Associate Engineer", company: "Capgemini", location: "Pune", salary: 82000, skills: ["Python", "AWS"], branch: "CSE" },
  { title: "Graduate Engineer", company: "L&T Technology", location: "Bangalore", salary: 80000, skills: ["AutoCAD", "MATLAB"], branch: "Mechanical" },
  { title: "Software Engineer", company: "Zoho", location: "Chennai", salary: 90000, skills: ["Java", "React"], branch: "CSE" },
  { title: "Backend Developer", company: "Freshworks", location: "Chennai", salary: 105000, skills: ["Ruby", "Rails"], branch: "CSE" },
  { title: "SDE", company: "Razorpay", location: "Bangalore", salary: 130000, skills: ["Node.js", "PostgreSQL"], branch: "CSE" },
  { title: "Software Engineer", company: "CRED", location: "Bangalore", salary: 135000, skills: ["Kotlin", "Go"], branch: "CSE" },
  { title: "Data Analyst", company: "PhonePe", location: "Bangalore", salary: 112000, skills: ["SQL", "Tableau"], branch: "IT" },
  { title: "SDE", company: "Meesho", location: "Bangalore", salary: 118000, skills: ["Java", "Spring Boot"], branch: "CSE" },
  { title: "Engineer", company: "Ola", location: "Bangalore", salary: 108000, skills: ["Python", "Kafka"], branch: "CSE" },
  { title: "Software Developer", company: "Byju's", location: "Bangalore", salary: 95000, skills: ["React", "Node.js"], branch: "CSE" },
  { title: "SDE", company: "Nykaa", location: "Mumbai", salary: 100000, skills: ["Java", "MySQL"], branch: "CSE" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
    await Job.deleteMany({});
    console.log("Old jobs cleared 🗑️");
    await Job.insertMany(jobs);
    console.log(`${jobs.length} jobs inserted ✅`);
    mongoose.connection.close();
    console.log("Done! Now run npm run dev 🚀");
  } catch (err) {
    console.error("Error:", err);
  }
}

seed();
