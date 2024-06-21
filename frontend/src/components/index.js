//for backend
// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// MongoDB Connection
const mongoURI = process.env.MONGO_URI; // Replace with your actual MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
 
// Define Routes
app.use('/api/signup', require('Signup.js')); // Example route for signup
app.use('/api/login', require('Login.js'));   // Example route for login
// Add more routes as needed

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the Server
const PORT = process.env.PORT || 5000; // Use the default port 5000 or a port defined in environment variables
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
