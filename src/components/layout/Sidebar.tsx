
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, Search, Bell, MessageCircle, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userInitials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'GU';

  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Profile', href: user ? `/profile/${user.name}` : '/profile', icon: User },
  ];

  return (
    <div className="hidden md:flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 w-64 overflow-y-auto border-r border-echo-border-light">
      <div className="px-4 py-6 space-y-4">
        <div className="px-3 py-2 text-xl font-bold text-echo-purple mb-6">
          Cohesion
        </div>
        
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors',
              location.pathname === item.href
                ? 'bg-echo-purple text-white'
                : 'text-echo-dark-text hover:bg-echo-background'
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
        
        <Button className="w-full echo-btn-primary mt-4">
          <Plus className="h-5 w-5 mr-1" />
          Create Post
        </Button>
      </div>
      
      {user && (
        <div className="px-4 py-4 border-t border-echo-border-light">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt={user.name} />
              <AvatarFallback className="bg-echo-light-purple text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium text-echo-dark-text">{user.name}</p>
              <p className="text-sm text-echo-light-text">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
