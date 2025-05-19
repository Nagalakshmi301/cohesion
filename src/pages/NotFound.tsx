
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-echo-background p-4">
      <div className="echo-card max-w-md w-full text-center py-12 px-6">
        <h1 className="text-6xl font-bold text-echo-purple mb-4">404</h1>
        <p className="text-xl text-echo-light-text mb-8">Oops! This page doesn't exist</p>
        <Button className="echo-btn-primary" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
