
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Search, 
  MessageCircle, 
  Menu, 
  User, 
  LogOut, 
  Settings 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface User {
  name: string;
  email: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/login');
  };

  const userInitials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'GU';

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-echo-border-light bg-white">
      <div className="echo-container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 sm:max-w-sm">
                <div className="px-4 py-6 flex flex-col h-full">
                  <Link to="/" className="text-2xl font-bold text-echo-purple mb-6">
                    Cohesion
                  </Link>
                  <div className="space-y-4">
                    <Link to="/" className="flex items-center p-2 rounded-md hover:bg-echo-background">
                      Home
                    </Link>
                    <Link to="/explore" className="flex items-center p-2 rounded-md hover:bg-echo-background">
                      Explore
                    </Link>
                    <Link to="/notifications" className="flex items-center p-2 rounded-md hover:bg-echo-background">
                      Notifications
                    </Link>
                    <Link to="/messages" className="flex items-center p-2 rounded-md hover:bg-echo-background">
                      Messages
                    </Link>
                    <Link to={`/profile/${user?.name}`} className="flex items-center p-2 rounded-md hover:bg-echo-background">
                      Profile
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Link to="/" className="text-xl font-bold text-echo-purple flex items-center">
            <span className="hidden sm:inline">Cohesion</span>
            <span className="sm:hidden">CH</span>
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center max-w-md w-full relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search Cohesion..." 
              className="pl-10 h-10 bg-echo-background border-0"
            />
          </div>
        </div>

        {/* Right navigation */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-echo-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-echo-light-purple text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user.name}`} className="cursor-pointer flex w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer flex w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="echo-btn-primary" asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
