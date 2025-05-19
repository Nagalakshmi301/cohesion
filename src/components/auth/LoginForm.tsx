
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any email with password "password" works
      if (password === 'password') {
        localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
        window.location.href = '/';
        toast({
          title: "Success!",
          description: "You've successfully logged in",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Try using 'password' as password.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-echo-purple">EchoMate</h1>
        <p className="text-echo-light-text mt-2">Welcome back! Log in to your account</p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="echo-text-input"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-echo-purple hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="echo-text-input"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full echo-btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-echo-light-text">
          Don't have an account?{' '}
          <Link to="/register" className="text-echo-purple hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
