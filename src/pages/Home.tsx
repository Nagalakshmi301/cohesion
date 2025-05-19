
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import PostFeed from '@/components/post/PostFeed';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-echo-background to-white">
      <Navbar />
      <div className="echo-container flex">
        <Sidebar />
        
        <main className="flex-1 mx-auto max-w-2xl py-6 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-echo-dark-text">Welcome to Cohesion</h1>
          
          {isLoggedIn ? (
            <PostFeed />
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="echo-card bg-gradient-to-r from-echo-purple to-echo-light-purple rounded-xl overflow-hidden text-white">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Share moments that matter</h2>
                  <p className="text-white/90 mb-6">Connect with friends, share your thoughts, and discover stories from people around the world.</p>
                  <div className="flex space-x-4">
                    <Button className="bg-white text-echo-purple hover:bg-white/90" onClick={() => navigate('/register')}>
                      Join Today
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/login')}>
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Featured Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="echo-card overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Technology" 
                    className="w-full h-56 object-cover hover:scale-105 transition-transform" 
                  />
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Connect with tech enthusiasts</h3>
                    <p className="text-echo-light-text text-sm">Explore the latest trends in technology and innovation.</p>
                  </div>
                </div>
                <div className="echo-card overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
                    alt="Nature" 
                    className="w-full h-56 object-cover hover:scale-105 transition-transform" 
                  />
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Share your favorite moments</h3>
                    <p className="text-echo-light-text text-sm">From pets to nature, share what makes you happy.</p>
                  </div>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="echo-card p-6 text-center flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4">Ready to start sharing?</h3>
                <p className="text-echo-light-text mb-6 max-w-lg">Join thousands of users who are already sharing their stories, photos, and experiences on Cohesion.</p>
                <Button className="echo-btn-primary flex items-center gap-2" onClick={() => navigate('/register')}>
                  Get Started <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
