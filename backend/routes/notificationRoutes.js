const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

router.get("/:userId", async (req, res) => {
  try {
    const notifs = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 }).limit(50);
    res.json(notifs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/read/:userId", async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.params.userId }, { read: true });
    res.json({ message: "Marked read" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/clear/:userId", async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.params.userId });
    res.json({ message: "Cleared" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
