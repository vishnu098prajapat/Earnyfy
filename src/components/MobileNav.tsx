import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, ShoppingBag, User, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleProtectedNavigation = async (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault(); // Always prevent default to handle navigation manually
    
    if (!user && path !== '/') {
      try {
        await signInWithGoogle();
        navigate(path); // Use navigate instead of window.location
      } catch (error) {
        toast.error('Please sign in to access this feature');
      }
    } else {
      navigate(path); // Navigate even if user is signed in
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-around h-16">
        <Link
          to="/"
          onClick={(e) => handleProtectedNavigation(e, '/')}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isActive('/') ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/dashboard"
          onClick={(e) => handleProtectedNavigation(e, '/dashboard')}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            !user 
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : isActive('/dashboard')
                ? 'text-primary-500'
                : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>

        <Link
          to="/videos"
          onClick={(e) => handleProtectedNavigation(e, '/videos')}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            !user 
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : isActive('/videos')
                ? 'text-primary-500'
                : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Play className="h-6 w-6" />
          <span className="text-xs mt-1">Watch</span>
        </Link>

        <Link
          to="/shop"
          onClick={(e) => handleProtectedNavigation(e, '/shop')}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            !user 
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : isActive('/shop')
                ? 'text-primary-500'
                : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Shop</span>
        </Link>

        <Link
          to="/profile"
          onClick={(e) => handleProtectedNavigation(e, '/profile')}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            !user 
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : isActive('/profile')
                ? 'text-primary-500'
                : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
