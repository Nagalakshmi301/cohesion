
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import PostCard, { Post } from '@/components/post/PostCard';

// Sample explore data with trending posts
const explorePosts: Post[] = [
  {
    id: 'e1',
    user: {
      name: 'Tech Explorer',
      image: '',
      username: 'techexplorer',
    },
    content: "Check out this new AI tool that's changing the way we code! #AI #Technology #Coding",
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    likes: 245,
    comments: [],
    timestamp: '2 days ago',
  },
  {
    id: 'e2',
    user: {
      name: 'Nature Photographer',
      image: '',
      username: 'naturephotographer',
    },
    content: "Sunrise at the Grand Canyon. Nature's beauty never ceases to amaze me.",
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    likes: 532,
    comments: [],
    timestamp: '1 day ago',
  },
  {
    id: 'e3',
    user: {
      name: 'Food Enthusiast',
      image: '',
      username: 'foodieforlife',
    },
    content: "Made this incredible pasta dish from scratch tonight! #Cooking #FoodLover",
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    likes: 198,
    comments: [],
    timestamp: '5 hours ago',
  }
];

const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch trending posts from an API
    // For now, we'll use sample data
    setPosts(explorePosts);
  }, []);
  
  return (
    <div className="min-h-screen bg-echo-background">
      <Navbar />
      <div className="echo-container flex">
        <Sidebar />
        
        <main className="flex-1 mx-auto max-w-2xl py-6 px-4">
          <h1 className="text-2xl font-bold mb-6">Explore</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Trending Topics</h2>
            <div className="flex flex-wrap gap-2">
              {["Technology", "Sports", "Politics", "Entertainment", "Science", "Health"].map((topic) => (
                <div key={topic} className="bg-white px-4 py-2 rounded-full shadow-sm hover:bg-echo-light-purple hover:text-white cursor-pointer transition-colors">
                  #{topic}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Explore;
