
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface Comment {
  id: string;
  user: {
    name: string;
    image: string;
  };
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: {
    name: string;
    image: string;
    username: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked?: boolean;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const { toast } = useToast();

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
      toast({
        title: "Post liked!",
        description: "You've successfully liked this post.",
      });
    }
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        image: '',
      },
      content: commentText,
      timestamp: 'Just now',
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
    setIsCommenting(false);
    
    toast({
      title: "Comment added!",
      description: "Your comment has been added to the post.",
    });
  };

  return (
    <div className="echo-card mb-4 animate-fade-in">
      {/* Post header */}
      <div className="flex justify-between items-center mb-4">
        <Link to={`/profile/${post.user.username}`} className="flex items-center group">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.image} alt={post.user.name} />
            <AvatarFallback className="bg-echo-light-purple text-white">
              {post.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium group-hover:underline">{post.user.name}</p>
            <p className="text-sm text-echo-light-text">@{post.user.username} • {post.timestamp}</p>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mute this user</DropdownMenuItem>
            <DropdownMenuItem>Report post</DropdownMenuItem>
            <DropdownMenuItem>Copy link to post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Post content */}
      <div className="mb-4">
        <p className="whitespace-pre-line">{post.content}</p>
        {post.image && (
          <img 
            src={post.image} 
            alt="Post content"
            className="mt-3 rounded-lg w-full object-cover max-h-96" 
          />
        )}
      </div>
      
      {/* Post actions */}
      <div className="flex items-center justify-between border-t border-echo-border-light pt-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-1",
            isLiked ? "text-red-500" : "text-echo-light-text"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
          <span>{likesCount}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-echo-light-text flex items-center gap-1"
          onClick={() => setIsCommenting(!isCommenting)}
        >
          <MessageCircle className="h-5 w-5" />
          <span>{comments.length}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-echo-light-text flex items-center gap-1"
          onClick={() => {
            navigator.clipboard.writeText(`https://echomate.app/post/${post.id}`);
            toast({
              title: "Link copied!",
              description: "Post link copied to clipboard.",
            });
          }}
        >
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </Button>
      </div>
      
      {/* Comment section */}
      {isCommenting && (
        <div className="mt-4 border-t border-echo-border-light pt-4">
          <Textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="echo-text-input mb-2"
          />
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsCommenting(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleComment}
              size="sm"
              className="echo-btn-primary"
              disabled={!commentText.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      )}
      
      {/* Comments list */}
      {comments.length > 0 && (
        <div className="mt-4 space-y-4 border-t border-echo-border-light pt-4">
          {comments.slice(0, 2).map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.image} alt={comment.user.name} />
                <AvatarFallback className="bg-echo-light-purple text-white text-xs">
                  {comment.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-echo-background rounded-lg p-3">
                  <p className="font-medium text-sm">{comment.user.name}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <p className="text-xs text-echo-light-text mt-1">{comment.timestamp}</p>
              </div>
            </div>
          ))}
          
          {comments.length > 2 && (
            <Button
              variant="ghost"
              className="text-echo-purple text-sm w-full"
            >
              View all {comments.length} comments
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
