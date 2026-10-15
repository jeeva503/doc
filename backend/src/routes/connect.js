const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Connection = require('../models/Connection');

const router = express.Router();

// POST /connect  { from, to }
// Saves that user `from` sent a request to user `to`. Safe to call twice.
router.post('/', async (req, res, next) => {
  try {
    const { from, to } = req.body;

    if (!mongoose.isValidObjectId(from) || !mongoose.isValidObjectId(to)) {
      return res.status(400).json({ message: '`from` and `to` must be valid user ids' });
    }
    if (from === to) {
      return res.status(400).json({ message: 'You cannot connect with yourself' });
    }

    const [fromUser, toUser] = await Promise.all([User.exists({ _id: from }), User.exists({ _id: to })]);
    if (!fromUser || !toUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // upsert = create if missing, otherwise do nothing (no duplicates)
    await Connection.updateOne({ from, to }, { $setOnInsert: { from, to } }, { upsert: true });

    res.status(201).json({ success: true, from, to });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
