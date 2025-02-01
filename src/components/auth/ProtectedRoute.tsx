import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        const authPopupEvent = new CustomEvent('showAuthPopup', {
          detail: { mode: 'signin' }
        });
        window.dispatchEvent(authPopupEvent);
      }, 3000); // Changed from 1000 to 3000 milliseconds

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!user) {
    return (
      <div 
        className="relative"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const isAuthPopup = target.closest('.auth-popup');
          if (!isAuthPopup) {
            e.preventDefault();
            e.stopPropagation();
            // Show popup on click if not already visible
            const authPopupEvent = new CustomEvent('showAuthPopup', {
              detail: { mode: 'signin' }
            });
            window.dispatchEvent(authPopupEvent);
          }
        }}
      >
        {children}
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 