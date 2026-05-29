const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/student",       require("./routes/studentRoutes"));
app.use("/api/company",       require("./routes/companyRoutes"));
app.use("/api/auth",          require("./routes/authRoutes"));
app.use("/api/study",         require("./routes/studyRoutes"));
app.use("/api/admin",         require("./routes/adminRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5001, () => console.log("Server running on port 5001"));
