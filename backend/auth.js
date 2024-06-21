//Create a signup endpoint
// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const router = express.Router();

// Function to send email
async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });

  console.log('Message sent: %s', info.messageId);
}

router.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const user = new User({ username, email, password: hashedPassword, otp });
    await user.save();
    await sendEmail(email, 'Email Confirmation', `Your OTP is ${otp}`);
    res.status(201).json({ message: 'User registered. Check your email for OTP.' });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed.' });
  }
});

module.exports = router;

//Create an endpoint for OTP-based login
router.post('/login-otp', async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email, otp });
      if (!user) {
        return res.status(400).json({ error: 'Invalid OTP.' });
      }
  
      user.otp = null; // Clear OTP after successful login
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed.' });
    }
  });
  
  //Create endpoints for fetching and updating user profiles:
  router.get('/profile', async (req, res) => {
    const { userId } = req.user; // Assuming the user ID is in the JWT payload
    try {
      const user = await User.findById(userId);
      res.json(user.profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile.' });
    }
  });
  
  router.put('/profile', async (req, res) => {
    const { userId } = req.user; // Assuming the user ID is in the JWT payload
    const { firstName, lastName, bio } = req.body;
  
    try {
      const user = await User.findById(userId);
      user.profile = { firstName, lastName, bio };
      await user.save();
      res.json(user.profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile.' });
    }
  });
  
  module.exports = router;
  
/* 
  Email Confirmation
Send a confirmation email after successful signup:
(Already implemented in the signup endpoint by sending OTP)

Include a link or OTP for the user to confirm their email address:
*/

router.post('/confirm-email', async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email, otp });
      if (!user) {
        return res.status(400).json({ error: 'Invalid OTP.' });
      }
  
      user.isEmailVerified = true;
      user.otp = null;
      await user.save();
  
      res.json({ message: 'Email confirmed successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Email confirmation failed.' });
    }
  });

/*  Setup Middlewares for Authentication
Middleware for checking JWT token:*/

// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
