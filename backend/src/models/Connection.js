const mongoose = require('mongoose');

// One document = "from" sent a connection request to "to".
const connectionSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Tapping Connect twice must not create duplicates.
connectionSchema.index({ from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model('Connection', connectionSchema);
