
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface User {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
  followers: number;
  following: number;
  posts: number;
  coverImage: string;
  profileImage: string;
}

// Sample data
const sampleUser: User = {
  name: 'Sarah Johnson',
  username: 'sarahjohnson',
  bio: 'Digital creator | Photography enthusiast | Coffee lover ☕️ | Sharing my journey through life one post at a time',
  location: 'San Francisco, CA',
  website: 'sarahjohnson.com',
  joinedDate: 'January 2023',
  followers: 1542,
  following: 387,
  posts: 126,
  coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
  profileImage: '',
};

const ProfileHeader = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { username } = useParams();
  const { toast } = useToast();
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isCurrentUser = currentUser && (currentUser.name?.toLowerCase()?.replace(/\s+/g, '') === username);
  
  useEffect(() => {
    // In a real app, we would fetch user data based on username
    // For now, we'll use sample data
    setUser(sampleUser);
  }, [username]);
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    
    toast({
      title: isFollowing ? 'Unfollowed' : 'Following',
      description: isFollowing 
        ? `You have unfollowed ${user?.name}`
        : `You are now following ${user?.name}`,
    });
  };
  
  if (!user) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }
  
  return (
    <div className="animate-fade-in">
      {/* Cover image */}
      <div 
        className="h-48 bg-echo-light-purple relative"
        style={{
          backgroundImage: user.coverImage ? `url(${user.coverImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Profile header */}
      <div className="px-6">
        <div className="flex justify-between items-start relative">
          <Avatar className="h-24 w-24 absolute -top-12 border-4 border-white">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback className="bg-echo-purple text-white text-2xl">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="w-full pt-16">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-echo-light-text">@{user.username}</p>
              </div>
              
              {isCurrentUser ? (
                <Button 
                  variant="outline" 
                  className="border-echo-purple text-echo-purple hover:bg-echo-purple hover:text-white"
                  asChild
                >
                  <Link to="/settings">Edit profile</Link>
                </Button>
              ) : (
                <Button
                  className={isFollowing ? "bg-white text-echo-dark-text border border-echo-border-light" : "echo-btn-primary"}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
            
            <p className="mt-3 text-echo-dark-text">{user.bio}</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-echo-light-text">
              {user.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.website && (
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <a 
                    href={`https://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-echo-purple hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-3 text-sm">
              <p>
                <span className="font-bold">{user.following}</span>
                <span className="text-echo-light-text ml-1">Following</span>
              </p>
              <p>
                <span className="font-bold">{user.followers}</span>
                <span className="text-echo-light-text ml-1">Followers</span>
              </p>
              <p>
                <span className="font-bold">{user.posts}</span>
                <span className="text-echo-light-text ml-1">Posts</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Profile tabs */}
        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
            <TabsTrigger 
              value="posts" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-echo-purple data-[state=active]:bg-transparent"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="replies" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-echo-purple data-[state=active]:bg-transparent"
            >
              Replies
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-echo-purple data-[state=active]:bg-transparent"
            >
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="likes" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-echo-purple data-[state=active]:bg-transparent"
            >
              Likes
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileHeader;
