
const express = require('express');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  // In a real app, this would query a database
  res.json({ 
    message: 'Get all users route',
    users: [
      { id: 1, name: 'Sarah Johnson', username: 'sarahjohnson', email: 'sarah@example.com' },
      { id: 2, name: 'Alex Rivera', username: 'alexrivera', email: 'alex@example.com' },
      { id: 3, name: 'Jamie Williams', username: 'jamiewilliams', email: 'jamie@example.com' }
    ]
  });
});

// GET user by username
router.get('/:username', (req, res) => {
  const username = req.params.username;
  // In a real app, this would query a database
  res.json({ 
    message: `Get user with username: ${username}`,
    user: { id: 1, name: 'Sarah Johnson', username: 'sarahjohnson', email: 'sarah@example.com' }
  });
});

// POST create new user
router.post('/', (req, res) => {
  const { name, email, username, password } = req.body;
  
  // In a real app, this would create a user in the database
  res.status(201).json({ 
    message: 'User created successfully',
    user: { name, email, username }
  });
});

// PUT update user
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, bio } = req.body;
  
  // In a real app, this would update a user in the database
  res.json({ 
    message: `Update user with id: ${id}`,
    user: { id, name, email, bio }
  });
});

// DELETE user
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  
  // In a real app, this would delete a user from the database
  res.json({ message: `Delete user with id: ${id}` });
});

module.exports = router;
