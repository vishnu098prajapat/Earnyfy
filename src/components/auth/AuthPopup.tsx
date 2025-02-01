import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { signInWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleShowPopup = () => {
      setIsVisible(true);
    };

    window.addEventListener('showAuthPopup', handleShowPopup as EventListener);
    return () => {
      window.removeEventListener('showAuthPopup', handleShowPopup as EventListener);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await signInWithGoogle();
      setIsVisible(false);
    } catch (error: any) {
      console.error('Google sign in failed:', error);
      if (error.code === 'auth/popup-blocked') {
        toast.error('Please allow popups for this website');
      } else {
        toast.error('Failed to sign in with Google');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    if (isSubmitting) return;
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="auth-popup relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={handleDismiss}
              disabled={isSubmitting}
              className={`absolute top-4 right-4 p-2 text-gray-400 rounded-full transition-all duration-200
                ${isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <X className="h-5 w-5" />
            </button>

            {isSubmitting && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <div className="p-8">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-lg transform -rotate-12 transition-all duration-300 hover:rotate-0 hover:scale-110">
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                    E
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3 mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Welcome to Earnify
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in with Google to start earning rewards
                </p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-4 px-6 py-3.5 
                  bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 
                  rounded-xl font-medium transition-all duration-200
                  hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-primary-500
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-900 dark:text-white text-lg">
                  Continue with Google
                </span>
              </button>

              <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthPopup; 