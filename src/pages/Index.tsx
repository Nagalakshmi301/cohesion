
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Home component
    navigate('/home', { replace: true });
  }, [navigate]);

  // We'll render Home as a fallback while redirecting
  return <Home />;
};

export default Index;
