require("dotenv").config();

const mongoose = require("mongoose");
const Job = require("./models/Job");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  await Job.deleteMany({});

  await Job.insertMany([

    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: 1800000,
      skills: ["react", "javascript", "html", "css"],
      minCGPA: 7.5,
      branch: "CSE"
    },

    {
      title: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad",
      salary: 2200000,
      skills: ["node.js", "mongodb", "express", "javascript"],
      minCGPA: 7.0,
      branch: "CSE"
    },

    {
      title: "AI Engineer",
      company: "OpenAI",
      location: "Remote",
      salary: 3500000,
      skills: ["python", "machine learning", "tensorflow", "nlp"],
      minCGPA: 8.0,
      branch: "AI"
    },

    {
      title: "Software Engineer",
      company: "Amazon",
      location: "Pune",
      salary: 2000000,
      skills: ["java", "spring boot", "mysql"],
      minCGPA: 7.0,
      branch: "CSE"
    },

    {
      title: "Cloud Engineer",
      company: "Infosys",
      location: "Noida",
      salary: 1200000,
      skills: ["aws", "docker", "linux"],
      minCGPA: 6.5,
      branch: "IT"
    },

    {
      title: "Full Stack Developer",
      company: "TCS",
      location: "Delhi",
      salary: 900000,
      skills: ["react", "node.js", "mongodb"],
      minCGPA: 6.0,
      branch: "CSE"
    }

  ]);

  console.log("Jobs Added Successfully ✅");

  mongoose.connection.close();

})
.catch(err => {
  console.log(err);
});