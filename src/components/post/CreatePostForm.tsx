
import { useState, ChangeEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Post } from './PostCard';

interface CreatePostFormProps {
  onPostCreated?: (post: Post) => void;
}

const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Get user from local storage
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Guest", "email": "guest@example.com"}');
  
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Image too large",
        description: "Please select an image less than 5MB in size.",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setImage(null);
  };
  
  const handleSubmit = async () => {
    if (!content.trim() && !image) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost: Post = {
        id: Date.now().toString(),
        user: {
          name: user.name,
          image: '',
          username: user.name.toLowerCase().replace(/\s+/g, ''),
        },
        content,
        image: image || undefined,
        likes: 0,
        comments: [],
        timestamp: 'Just now',
        isLiked: false,
      };
      
      if (onPostCreated) {
        onPostCreated(newPost);
      }
      
      setContent('');
      setImage(null);
      setIsLoading(false);
      
      toast({
        title: "Post created!",
        description: "Your post has been published successfully.",
      });
    }, 1000);
  };

  return (
    <div className="echo-card mb-6">
      <div className="flex space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" alt={user.name} />
          <AvatarFallback className="bg-echo-light-purple text-white">
            {user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="echo-text-input mb-3 min-h-[100px]"
          />
          
          {image && (
            <div className="relative mb-3">
              <img 
                src={image} 
                alt="Upload preview"
                className="rounded-lg max-h-64 object-cover" 
              />
              <Button 
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 opacity-90"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div>
              <Button
                variant="ghost" 
                size="icon"
                className="text-echo-purple"
                asChild
              >
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Image className="h-5 w-5" />
                  <input 
                    type="file" 
                    id="image-upload" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </Button>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={isLoading || (!content.trim() && !image)}
              className="echo-btn-primary"
            >
              {isLoading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
