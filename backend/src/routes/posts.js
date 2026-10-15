const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// GET /posts -> latest posts (newest first) with the author's details filled in.
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'name occupation profileImage');
    res.json({ posts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
