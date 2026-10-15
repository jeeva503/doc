const express = require('express');
const User = require('../models/User');
const Connection = require('../models/Connection');
const { CURRENT_USER_ID } = require('../config/constants');

const router = express.Router();

// GET /users
// Returns the logged-in user, everyone else (for the Discover list), and the
// ids the logged-in user has already requested so the app can show "Requested".
router.get('/', async (req, res, next) => {
  try {
    const currentUserId = req.query.currentUserId || CURRENT_USER_ID;

    const [currentUser, users, requests] = await Promise.all([
      User.findById(currentUserId),
      User.find({ _id: { $ne: currentUserId } }).sort({ _id: 1 }),
      Connection.find({ from: currentUserId }).select('to'),
    ]);

    if (!currentUser) {
      return res.status(404).json({ message: 'Current user not found. Did you run the seed script?' });
    }

    res.json({
      currentUser,
      users,
      requestedIds: requests.map((r) => r.to.toString()),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
