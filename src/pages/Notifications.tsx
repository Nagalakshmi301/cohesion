
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  user: {
    name: string;
    username: string;
    image: string;
  };
  content: string;
  postId?: string;
  timestamp: string;
  read: boolean;
}

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    user: {
      name: 'Michael Chen',
      username: 'michaelchen',
      image: '',
    },
    content: 'liked your post about AI books',
    postId: '1',
    timestamp: '2 minutes ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'comment',
    user: {
      name: 'Priya Patel',
      username: 'priyapatel',
      image: '',
    },
    content: 'commented on your post about AI books',
    postId: '1',
    timestamp: '10 minutes ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'follow',
    user: {
      name: 'Alex Rivera',
      username: 'alexrivera',
      image: '',
    },
    content: 'started following you',
    timestamp: '1 hour ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'like',
    user: {
      name: 'Taylor Smith',
      username: 'taylorsmith',
      image: '',
    },
    content: 'liked your comment on Jamie\'s post',
    postId: '3',
    timestamp: '3 hours ago',
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch notifications from an API
    // For now, we'll use sample data
    setNotifications(sampleNotifications);
  }, []);
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-echo-background">
      <Navbar />
      <div className="echo-container flex">
        <Sidebar />
        
        <main className="flex-1 mx-auto max-w-2xl py-6 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Button variant="ghost" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          
          {notifications.length > 0 ? (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`echo-card p-4 flex items-center ${!notification.read ? 'bg-echo-background border-l-4 border-echo-purple' : ''}`}
                >
                  <div className="mr-4">
                    {getIcon(notification.type)}
                  </div>
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={notification.user.image} alt={notification.user.name} />
                    <AvatarFallback className="bg-echo-light-purple text-white">
                      {notification.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p>
                      <span className="font-medium">{notification.user.name}</span>
                      {' '}{notification.content}
                    </p>
                    <p className="text-sm text-echo-light-text">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="echo-card text-center py-10">
              <h2 className="text-xl font-bold mb-2">No notifications yet</h2>
              <p className="text-echo-light-text">
                When you get notifications, you'll see them here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Notifications;
