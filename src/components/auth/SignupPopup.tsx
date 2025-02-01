import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SignupPopupProps {
  onClose: () => void;
}

const SignupPopup: React.FC<SignupPopupProps> = ({ onClose }) => {
  const { signInWithGoogle } = useAuth();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      handleClose();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 transform transition-transform duration-300 ease-in-out">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold">E</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Join Earnify Today!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sign up now to start earning points, redeem exclusive rewards, and get amazing discounts!
          </p>

          <div className="space-y-4">
            <button
              onClick={handleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;
