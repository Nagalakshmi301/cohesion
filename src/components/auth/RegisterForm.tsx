
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email, name }));
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
      window.location.href = '/';
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-echo-purple">EchoMate</h1>
        <p className="text-echo-light-text mt-2">Create your account and start connecting</p>
      </div>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="echo-text-input"
          />
        </div>
        
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="echo-text-input"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="echo-text-input"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full echo-btn-primary mt-4"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-echo-light-text">
          Already have an account?{' '}
          <Link to="/login" className="text-echo-purple hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
