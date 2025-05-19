
import { useState } from 'react';
import PostCard, { Post } from './PostCard';
import CreatePostForm from './CreatePostForm';

// Sample data with prettier images
const initialPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      image: '',
      username: 'sarahjohnson',
    },
    content: "Just finished reading an amazing book on AI and its impact on society. Highly recommended! 📚 #AI #BookRecommendation",
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    likes: 42,
    comments: [
      {
        id: 'c1',
        user: {
          name: 'Michael Chen',
          image: '',
        },
        content: "What's the title of the book? I've been looking for good AI reads!",
        timestamp: '2 hours ago',
      },
      {
        id: 'c2',
        user: {
          name: 'Priya Patel',
          image: '',
        },
        content: "I've been reading a lot about AI lately too. The developments are fascinating.",
        timestamp: '1 hour ago',
      },
    ],
    timestamp: '3 hours ago',
  },
  {
    id: '2',
    user: {
      name: 'Alex Rivera',
      image: '',
      username: 'alexrivera',
    },
    content: "Beautiful sunset at the beach today! Taking a moment to appreciate nature's beauty. 🌅",
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    likes: 87,
    comments: [],
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    user: {
      name: 'Jamie Williams',
      image: '',
      username: 'jamiewilliams',
    },
    content: "Just launched my new portfolio website! It's been a labor of love and I'm so excited to finally share it with the world. Check it out and let me know what you think! #WebDev #Portfolio",
    likes: 31,
    comments: [
      {
        id: 'c3',
        user: {
          name: 'Taylor Smith',
          image: '',
        },
        content: 'Looks amazing! I love the clean design and the project showcase.',
        timestamp: '30 minutes ago',
      },
    ],
    timestamp: '8 hours ago',
  },
  {
    id: '4',
    user: {
      name: 'Morgan Lee',
      image: '',
      username: 'morganlee',
    },
    content: "Exploring the amazing architecture in Barcelona this week! Every corner has something beautiful to discover. ✨",
    image: 'https://images.unsplash.com/photo-1583779791512-eecbcbba93ac',
    likes: 126,
    comments: [
      {
        id: 'c4',
        user: {
          name: 'Chris Rodriguez',
          image: '',
        },
        content: 'La Sagrada Familia is a must-see! Enjoy your trip!',
        timestamp: '4 hours ago',
      },
    ],
    timestamp: '1 day ago',
  },
];

const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  const handleNewPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };
  
  return (
    <div className="space-y-6">
      <CreatePostForm onPostCreated={handleNewPost} />
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="animate-fade-in" style={{animationDelay: `${posts.indexOf(post) * 0.1}s`}}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
