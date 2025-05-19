
const express = require('express');
const router = express.Router();

// POST register user
router.post('/register', (req, res) => {
  const { name, email, username, password } = req.body;
  
  // In a real app, this would validate input, hash the password, and save to database
  res.status(201).json({ 
    message: 'User registered successfully',
    user: { name, email, username },
    token: 'sample-jwt-token'
  });
});

// POST login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // In a real app, this would authenticate the user and generate a JWT
  res.json({ 
    message: 'Login successful',
    user: { 
      name: 'Sample User', 
      email,
      username: 'sampleuser'
    },
    token: 'sample-jwt-token'
  });
});

// GET current logged in user
router.get('/me', (req, res) => {
  // In a real app, this would verify the JWT and return user data
  res.json({ 
    user: { 
      name: 'Sample User', 
      email: 'sample@example.com',
      username: 'sampleuser'
    }
  });
});

module.exports = router;
