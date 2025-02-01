import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const PUBLIC_ROUTES = ['/', '/how-it-works'];

export const useSignupEnforcer = () => {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current route is public
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  useEffect(() => {
    let popupInterval: NodeJS.Timeout;

    if (!user) {
      // Show popup every 2 seconds if not signed in
      popupInterval = setInterval(() => {
        setShowPopup(true);
      }, 2000);

      // If trying to access protected route, redirect to home
      if (!isPublicRoute) {
        navigate('/', { replace: true });
        setShowPopup(true);
      }
    }

    return () => {
      if (popupInterval) {
        clearInterval(popupInterval);
      }
    };
  }, [user, location.pathname, isPublicRoute, navigate]);

  return {
    showPopup,
    setShowPopup,
    isAuthenticated: !!user,
    isPublicRoute,
  };
};
