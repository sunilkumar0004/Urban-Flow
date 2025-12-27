const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  activeAgents: Number,
  averageSpeed: Number,
  hotspots: Array 
});

const MovementLog = mongoose.model('MovementLog', logSchema);

// GET: Fetch historical analytics
router.get('/history', async (req, res) => {
  try {
    const logs = await MovementLog.find().sort({ timestamp: -1 }).limit(10);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Save a simulation snapshot
router.post('/log', async (req, res) => {
  try {
    const newLog = new MovementLog(req.body);
    await newLog.save();
    res.json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;