require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Post = require('../src/models/Post');
const Connection = require('../src/models/Connection');
const { CURRENT_USER_ID } = require('../src/config/constants');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/docconnect';

const AVATAR = '/images/avatar-placeholder.png';

// The first user is the hardcoded "logged-in" user.
const users = [
  { _id: CURRENT_USER_ID, name: 'Dr. Arjun Mehta', occupation: 'Cardiology', profileImage: AVATAR, connections: 2 },
  { name: 'Docconnect', occupation: 'Healthcare Technology', profileImage: '/images/docconnect-logo.png', connections: 120 },
  { name: 'Dr. Priya Sharma', occupation: 'Neurology', profileImage: AVATAR, connections: 48 },
  { name: 'Rahul Verma', occupation: 'Pharmacist', profileImage: AVATAR, connections: 31 },
  { name: 'Ananya Iyer', occupation: 'Nurse', profileImage: AVATAR, connections: 64 },
];

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Start fresh so the script can be re-run safely
  await Promise.all([User.deleteMany({}), Post.deleteMany({}), Connection.deleteMany({})]);

  const created = await User.insertMany(users);
  const [, docconnect, priya, rahul, ananya] = created;

  const hoursAgo = (h) => new Date(Date.now() - h * 60 * 60 * 1000);

  await Post.insertMany([
    {
      content:
        "Welcome to Docconnect! We're building India's largest healthcare professional network. Connect with doctors, nurses, pharmacists, and medical students across the country. Let's transform healthcare collaboration together. 🇮🇳",
      author: docconnect._id,
      image: '/images/post-1-surgeon.jpg',
      createdAt: hoursAgo(1),
    },
    {
      content: 'Between memory and forgetting, there is a path of care. Remembering World Alzheimer’s Awareness Day.',
      author: priya._id,
      image: '/images/post-2-alzheimer.jpg',
      createdAt: hoursAgo(5),
    },
    {
      content: 'Wellness Week starts today. Take a moment for your mental health, because caring for others begins with caring for yourself.',
      author: ananya._id,
      image: '/images/post-3-wellness.jpg',
      createdAt: hoursAgo(12),
    },
    {
      content: 'Senior care is about dignity and support. Every loved one deserves to feel at home.',
      author: rahul._id,
      image: '/images/post-4-senior-care.jpg',
      createdAt: hoursAgo(26),
    },
    {
      content: 'Not all heroes wear capes. Some wear scrubs. Thank you to every healthcare worker on the night shift.',
      author: docconnect._id,
      image: '/images/post-5-healix.jpg',
      createdAt: hoursAgo(48),
    },
  ]);

  console.log(`Seeded ${created.length} users and 5 posts`);
  console.log(`Logged-in user id: ${CURRENT_USER_ID}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
