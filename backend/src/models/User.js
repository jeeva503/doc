const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  // Path under /images (served statically), e.g. "/images/avatar-placeholder.png"
  profileImage: { type: String, required: true },
  // Shown as "2 Connects" on the Home profile card.
  connections: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
