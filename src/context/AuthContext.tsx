import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { auth, googleProvider } from '../config/firebase';
import { 
  signInWithPopup, 
  onAuthStateChanged, 
  setPersistence, 
  browserLocalPersistence,
} from 'firebase/auth';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface UserHistory {
  points: number;
  rewards: any[];
  videos: any[];
  referrals: any[];
  purchasedProducts: {
    id: string;
    timestamp: number;
  }[];
  watchedVideos: {
    id: string;
    timestamp: number;
    completed: boolean;
  }[];
  redeemedProducts: {
    id: string;
    timestamp: number;
    status: 'redeemed' | 'pending' | 'completed';
  }[];
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Add points management
  const initializeNewUser = (userId: string) => {
    // Check if this is user's first time (no history exists)
    const existingHistory = localStorage.getItem(`history_${userId}`);
    if (!existingHistory) {
      // Set initial points (welcome bonus)
      localStorage.setItem('points', '50'); // 50 rupees welcome bonus
      
      // Initialize other user data
      localStorage.setItem('rewards', JSON.stringify([]));
      localStorage.setItem('watchedVideos', JSON.stringify([]));
      localStorage.setItem('referrals', JSON.stringify([]));

      // Save initial history
      const initialHistory: UserHistory = {
        points: 50,
        rewards: [],
        videos: [],
        referrals: [],
        purchasedProducts: [],
        watchedVideos: [],
        redeemedProducts: []
      };
      localStorage.setItem(`history_${userId}`, JSON.stringify(initialHistory));

      // Show welcome message
      toast.success('Welcome! You received ₹50 as a welcome bonus! 🎉');
    } else {
      // Existing user - restore their history
      restoreUserHistory(userId);
    }
  };

  // Save user history before logout
  const saveUserHistory = (userId: string) => {
    const history: UserHistory = {
      points: Number(localStorage.getItem('points')) || 0,
      rewards: JSON.parse(localStorage.getItem('rewards') || '[]'),
      videos: JSON.parse(localStorage.getItem('watchedVideos') || '[]'),
      referrals: JSON.parse(localStorage.getItem('referrals') || '[]'),
      purchasedProducts: JSON.parse(localStorage.getItem('purchasedProducts') || '[]'),
      watchedVideos: JSON.parse(localStorage.getItem('watchedVideos') || '[]'),
      redeemedProducts: JSON.parse(localStorage.getItem('redeemedProducts') || '[]')
    };

    // Save complete history with user ID
    localStorage.setItem(`userHistory_${userId}`, JSON.stringify(history));
  };

  // Restore user history after login
  const restoreUserHistory = (userId: string) => {
    const savedHistory = localStorage.getItem(`userHistory_${userId}`);
    if (savedHistory) {
      const history: UserHistory = JSON.parse(savedHistory);
      
      // Restore all user data
      localStorage.setItem('points', history.points.toString());
      localStorage.setItem('rewards', JSON.stringify(history.rewards));
      localStorage.setItem('videos', JSON.stringify(history.videos));
      localStorage.setItem('referrals', JSON.stringify(history.referrals));
      localStorage.setItem('purchasedProducts', JSON.stringify(history.purchasedProducts));
      localStorage.setItem('watchedVideos', JSON.stringify(history.watchedVideos));
      localStorage.setItem('redeemedProducts', JSON.stringify(history.redeemedProducts));
    }
  };

  useEffect(() => {
    // Set persistence to LOCAL - user will stay logged in even after refresh
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Listen to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            // Update user state when Firebase auth state changes
            const updatedUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              photo: firebaseUser.photoURL || undefined
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Restore complete user history
            restoreUserHistory(firebaseUser.uid);
          } else {
            setUser(null);
          }
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error('Error setting auth persistence:', error);
      });
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      if (result.user) {
        const updatedUser: User = {
          id: result.user.uid,
          name: result.user.displayName || 'User',
          email: result.user.email || '',
          photo: result.user.photoURL || undefined
        };
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Initialize or restore user data
        initializeNewUser(result.user.uid);
        
        toast.success('Successfully signed in!');
      }
    } catch (error: any) {
      console.error('Google sign in failed:', error);
      throw error; // Let AuthPopup handle the error
    }
  };

  const logout = async () => {
    try {
      if (user?.id) {
        saveUserHistory(user.id);
      }

      await auth.signOut();
      setUser(null);
      localStorage.removeItem('user');
      
      // Redirect to home page
      window.location.href = '/';
      
      toast.success('Successfully logged out', {
        id: 'logout-toast'
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout', {
        id: 'logout-error-toast'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      signInWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 