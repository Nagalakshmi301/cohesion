
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Send } from 'lucide-react';

interface Conversation {
  id: string;
  user: {
    name: string;
    username: string;
    image: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'other';
}

// Sample conversations data
const sampleConversations: Conversation[] = [
  {
    id: 'c1',
    user: {
      name: 'Michael Chen',
      username: 'michaelchen',
      image: '',
    },
    lastMessage: 'Thanks for the book recommendation!',
    timestamp: '2 minutes ago',
    unread: true,
  },
  {
    id: 'c2',
    user: {
      name: 'Priya Patel',
      username: 'priyapatel',
      image: '',
    },
    lastMessage: 'Will you be at the tech conference next week?',
    timestamp: '3 hours ago',
    unread: false,
  },
  {
    id: 'c3',
    user: {
      name: 'Alex Rivera',
      username: 'alexrivera',
      image: '',
    },
    lastMessage: 'That sunset photo was amazing!',
    timestamp: '1 day ago',
    unread: false,
  },
];

// Sample messages for a conversation
const sampleMessages: Message[] = [
  {
    id: 'm1',
    text: 'Hey, how are you doing?',
    timestamp: '10:30 AM',
    sender: 'other',
  },
  {
    id: 'm2',
    text: 'I\'m good! Just finished reading that book you recommended.',
    timestamp: '10:32 AM',
    sender: 'user',
  },
  {
    id: 'm3',
    text: 'Oh great! What did you think of it?',
    timestamp: '10:33 AM',
    sender: 'other',
  },
  {
    id: 'm4',
    text: 'It was amazing! The author\'s perspective on AI was really insightful.',
    timestamp: '10:36 AM',
    sender: 'user',
  },
  {
    id: 'm5',
    text: 'Thanks for the book recommendation!',
    timestamp: '10:40 AM',
    sender: 'other',
  },
];

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [activeConversation, setActiveConversation] = useState<string | null>('c1');
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: `m${Date.now()}`,
      text: newMessage,
      timestamp: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`,
      sender: 'user',
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const activeUser = conversations.find(conv => conv.id === activeConversation)?.user;
  
  return (
    <div className="min-h-screen bg-echo-background">
      <Navbar />
      <div className="echo-container flex">
        <Sidebar />
        
        <main className="flex-1 mx-auto max-w-4xl py-6 px-4">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>
          
          <div className="flex h-[calc(80vh-6rem)] bg-white rounded-lg shadow overflow-hidden">
            {/* Conversations list */}
            <div className="w-1/3 border-r">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-10 h-10 bg-echo-background border-0"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(80vh-10rem)]">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 ${activeConversation === conversation.id ? 'bg-gray-50' : ''} ${conversation.unread ? 'font-medium' : ''}`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={conversation.user.image} alt={conversation.user.name} />
                      <AvatarFallback className="bg-echo-light-purple text-white">
                        {conversation.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm truncate text-gray-600">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-echo-purple rounded-full ml-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Message header */}
                  <div className="p-4 border-b flex items-center bg-white">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={activeUser?.image} alt={activeUser?.name} />
                      <AvatarFallback className="bg-echo-light-purple text-white">
                        {activeUser?.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeUser?.name}</h3>
                      <p className="text-xs text-gray-500">@{activeUser?.username}</p>
                    </div>
                  </div>
                  
                  {/* Messages content */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : ''}`}>
                          <div className={`max-w-[70%] px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-echo-purple text-white' : 'bg-white border'}`}>
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-gray-200' : 'text-gray-500'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message input */}
                  <div className="p-3 border-t flex">
                    <Input 
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)} 
                      className="flex-1"
                      onKeyDown={handleKeyPress}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()} 
                      className="ml-2 bg-echo-purple hover:bg-echo-purple/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <p className="text-lg font-medium">Select a conversation</p>
                    <p className="text-gray-500">Choose a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
