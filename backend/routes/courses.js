const express = require('express');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');
const User = require('../models/User');
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.post('/enroll/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user.enrolledCourses.includes(req.params.id)) {
    user.enrolledCourses.push(req.params.id);
    await user.save();
  }
  res.json({ message: 'Enrolled' });
});

module.exports = router;
