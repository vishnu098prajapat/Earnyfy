import { Link, useLocation } from 'react-router-dom';
import { Upload, Home, ShoppingBag, LayoutDashboard, X, User, LogOut, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { usePoints } from '../context/PointsContext';
import Footer from './Footer';
import ProfileMenu from './ProfileMenu';
import MobileNav from './MobileNav';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { points, userProfile } = usePoints();
  const location = useLocation();
  const { user, signInWithGoogle } = useAuth();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleProtectedNavigation = async (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!user && path !== '/') {
      e.preventDefault();
      try {
        await signInWithGoogle();
        window.location.href = path;
      } catch (error) {
        toast.error('Please sign in to access this feature');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 -ml-2 mr-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Earnify
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>

              <Link 
                to="/dashboard" 
                onClick={(e) => handleProtectedNavigation(e, '/dashboard')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  !user 
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              <Link 
                to="/videos" 
                onClick={(e) => handleProtectedNavigation(e, '/videos')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  !user 
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Upload className="h-4 w-4" />
                <span>Watch</span>
              </Link>

              <Link 
                to="/shop" 
                onClick={(e) => handleProtectedNavigation(e, '/shop')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  !user 
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Shop</span>
              </Link>
            </div>

            {/* Right Side Items */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white dark:bg-gray-800 z-50 transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="px-2 pt-4 space-y-1">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Home</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-3 rounded-lg ${
              !user
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={(e) => {
              handleProtectedNavigation(e, '/dashboard');
              setIsMobileMenuOpen(false);
            }}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/videos"
            className={`flex items-center px-4 py-3 rounded-lg ${
              !user
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={(e) => {
              handleProtectedNavigation(e, '/videos');
              setIsMobileMenuOpen(false);
            }}
          >
            <Upload className="h-5 w-5 mr-3" />
            <span>Watch</span>
          </Link>

          <Link
            to="/shop"
            className={`flex items-center px-4 py-3 rounded-lg ${
              !user
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={(e) => {
              handleProtectedNavigation(e, '/shop');
              setIsMobileMenuOpen(false);
            }}
          >
            <ShoppingBag className="h-5 w-5 mr-3" />
            <span>Shop</span>
          </Link>
        </nav>

        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={user.photo || ''}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content with Padding Top and Bottom for Mobile Nav */}
      <main className="flex-1 mt-16 mb-16 md:mb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      <Footer className="hidden md:block" />
    </div>
  );
};

export default Layout;