
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-echo-background px-4 py-12">
      <Link to="/" className="absolute top-4 left-4 text-echo-purple font-medium">
        ← Back to home
      </Link>
      <LoginForm />
    </div>
  );
};

export default Login;
