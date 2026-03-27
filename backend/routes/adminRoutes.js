const router = require("express").Router();
const User = require("../models/User");

// Middleware to check admin role
function adminOnly(req, res, next) {
  const role = req.body.role || req.query.role; // example: pass role in body/query
  if(role && role.toLowerCase() === "admin") {
    next();
  } else {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
}

// GET dashboard stats
router.get("/stats", adminOnly, async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const companies = await User.countDocuments({ role: "company" });
    const placements = 80; // replace with actual placements from DB if you have a collection
    res.json({ students, companies, placements });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Approve user (example: set a field approved: true)
router.post("/approve", adminOnly, async (req, res) => {
  try {
    const { userId } = req.body;
    if(!userId) return res.status(400).json({ msg: "User ID required" });

    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ msg: "User not found" });

    user.approved = true; // add approved field dynamically
    await user.save();

    res.json({ msg: `User ${user.name} approved successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;