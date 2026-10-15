require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const connectRoute = require('./routes/connect');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/docconnect';

app.use(cors());
app.use(express.json());

// Profile and post images are served from backend/public/images
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

app.use('/users', usersRoute);
app.use('/posts', postsRoute);
app.use('/connect', connectRoute);

// Last-resort error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // 0.0.0.0 so a phone on the same Wi-Fi can reach it
    app.listen(PORT, '0.0.0.0', () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
