
const express = require('express');
const router = express.Router();

// GET all posts
router.get('/', (req, res) => {
  // In a real app, this would query a database
  res.json({ 
    message: 'Get all posts route',
    posts: [
      {
        id: '1',
        user: {
          name: 'Sarah Johnson',
          username: 'sarahjohnson',
        },
        content: 'Just finished reading an amazing book on AI and its impact on society. Highly recommended! 📚 #AI #BookRecommendation',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        likes: 42,
        comments: 2,
        timestamp: '3 hours ago',
      },
      {
        id: '2',
        user: {
          name: 'Alex Rivera',
          username: 'alexrivera',
        },
        content: 'Beautiful sunset at the beach today! Taking a moment to appreciate nature\'s wonders. 🌅',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        likes: 87,
        comments: 0,
        timestamp: '5 hours ago',
      }
    ]
  });
});

// GET post by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  // In a real app, this would query a database
  res.json({ 
    message: `Get post with id: ${id}`,
    post: {
      id,
      user: {
        name: 'Sarah Johnson',
        username: 'sarahjohnson',
      },
      content: 'Just finished reading an amazing book on AI and its impact on society. Highly recommended! 📚 #AI #BookRecommendation',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      likes: 42,
      comments: 2,
      timestamp: '3 hours ago',
    }
  });
});

// POST create new post
router.post('/', (req, res) => {
  const { content, image } = req.body;
  
  // In a real app, this would create a post in the database
  res.status(201).json({ 
    message: 'Post created successfully',
    post: { 
      id: Math.random().toString(36).substring(7),
      content, 
      image,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      user: {
        name: 'Current User',
        username: 'currentuser',
      }
    }
  });
});

// PUT update post
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { content, image } = req.body;
  
  // In a real app, this would update a post in the database
  res.json({ 
    message: `Update post with id: ${id}`,
    post: { id, content, image }
  });
});

// DELETE post
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  
  // In a real app, this would delete a post from the database
  res.json({ message: `Delete post with id: ${id}` });
});

// POST like a post
router.post('/:id/like', (req, res) => {
  const id = req.params.id;
  
  // In a real app, this would update likes in the database
  res.json({ 
    message: `Post ${id} liked successfully`,
    likes: 43
  });
});

// POST comment on a post
router.post('/:id/comment', (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  
  // In a real app, this would add a comment in the database
  res.status(201).json({ 
    message: `Comment added to post ${id}`,
    comment: {
      id: Math.random().toString(36).substring(7),
      content,
      user: {
        name: 'Current User',
        username: 'currentuser',
      },
      timestamp: 'Just now'
    }
  });
});

module.exports = router;
