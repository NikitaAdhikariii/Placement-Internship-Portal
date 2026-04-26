const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const authRoutes = require("./routes/authRoutes");
const studyRoutes = require("./routes/studyRoutes");

app.use("/api/student", studentRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/study", studyRoutes);

// ================= DB =================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.log(err));

// ================= SERVER =================
app.listen(5001, () => {
  console.log("Server running on port 5001 🚀");
});
