
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PostCard, { Post } from '@/components/post/PostCard';

// Sample data
const samplePosts: Post[] = [
  {
    id: '101',
    user: {
      name: 'Sarah Johnson',
      image: '',
      username: 'sarahjohnson',
    },
    content: "Had an amazing time at the photography workshop this weekend! Learned so many new techniques and met wonderful people. Can't wait to apply what I learned! 📸 #Photography #Workshop",
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    likes: 52,
    comments: [
      {
        id: 'c101',
        user: {
          name: 'David Chen',
          image: '',
        },
        content: 'Your photos are always amazing! Would love to see some of the new techniques you learned!',
        timestamp: '1 day ago',
      }
    ],
    timestamp: '3 days ago',
  },
  {
    id: '102',
    user: {
      name: 'Sarah Johnson',
      image: '',
      username: 'sarahjohnson',
    },
    content: 'Morning coffee and journaling to start the day right. What are your morning rituals? ☕️',
    likes: 34,
    comments: [],
    timestamp: '1 week ago',
  },
  {
    id: '103',
    user: {
      name: 'Sarah Johnson',
      image: '',
      username: 'sarahjohnson',
    },
    content: "Just finished reading \"The Midnight Library\" by Matt Haig. A beautifully written story about life's infinite possibilities. Highly recommend! 📚 #BookRecommendation",
    likes: 78,
    comments: [
      {
        id: 'c102',
        user: {
          name: 'Emma Wilson',
          image: '',
        },
        content: 'I just finished that book too! Absolutely loved the message about appreciating the life we have.',
        timestamp: '5 days ago',
      },
      {
        id: 'c103',
        user: {
          name: 'James Miller',
          image: '',
        },
        content: 'Adding this to my reading list! Thanks for the recommendation.',
        timestamp: '5 days ago',
      }
    ],
    timestamp: '2 weeks ago',
  }
];

const Profile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, we would fetch posts based on username
    // For now, we'll use sample data
    setPosts(samplePosts);
  }, [username]);
  
  return (
    <div className="min-h-screen bg-echo-background">
      <Navbar />
      <div className="echo-container flex">
        <Sidebar />
        
        <main className="flex-1 mx-auto max-w-3xl">
          <ProfileHeader />
          
          <div className="px-4 py-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            
            {posts.length === 0 && (
              <div className="echo-card text-center py-10">
                <h2 className="text-xl font-bold mb-2">No posts yet</h2>
                <p className="text-echo-light-text mb-4">
                  When {username} posts, you'll see their posts here.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
