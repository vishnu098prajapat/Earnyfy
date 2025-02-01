import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface PointsHistory {
  id: number;
  type: 'earned' | 'redeemed';
  amount: number;
  productId?: number;
  timestamp: Date;
}

interface PointsBatch {
  amount: number;
  expiryDate: Date;
}

interface UserProfile {
  name: string;
  photo: string | null;
}

interface PointsContextType {
  points: number;
  earnedPoints: number;
  redeemedPoints: number;
  redeemedProductIds: Set<number>;
  pointsHistory: PointsHistory[];
  userProfile: UserProfile;
  addPoints: (amount: number) => void;
  removePoints: (amount: number) => void;
  addRedeemedProduct: (productId: number) => void;
  addToHistory: (entry: Omit<PointsHistory, 'id' | 'timestamp'>) => void;
  updateProfile: (profile: UserProfile) => void;
  referralCode: string;
  referralCount: number;
  generateReferralCode: () => string;
  applyReferralCode: (code: string) => void;
}

const generateRandomCode = () => {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  return code;
};

const PointsContext = createContext<PointsContextType | undefined>(undefined);

const MILESTONES = [
  { points: 1000, reward: 100, title: 'Bronze Member' },
  { points: 5000, reward: 500, title: 'Silver Member' },
  { points: 10000, reward: 1000, title: 'Gold Member' },
];

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('userPoints');
    return savedPoints ? parseInt(savedPoints) : 2500;
  });

  const [earnedPoints, setEarnedPoints] = useState(() => {
    const saved = localStorage.getItem('earnedPoints');
    return saved ? parseInt(saved) : 0;
  });

  const [redeemedPoints, setRedeemedPoints] = useState(() => {
    const saved = localStorage.getItem('redeemedPoints');
    return saved ? parseInt(saved) : 0;
  });

  const [redeemedProductIds, setRedeemedProductIds] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('redeemedProducts');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [pointsHistory, setPointsHistory] = useState<PointsHistory[]>(() => {
    const saved = localStorage.getItem('pointsHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [pointsBatches, setPointsBatches] = useState<PointsBatch[]>([]);

  // Track last earned amount for milestone check
  const [lastEarnedAmount, setLastEarnedAmount] = useState(0);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Your Name',
      photo: null
    };
  });

  const [referralCode, setReferralCode] = useState(() => {
    const saved = localStorage.getItem('referralCode');
    if (saved) return saved;
    
    const newCode = generateRandomCode();
    localStorage.setItem('referralCode', newCode);
    return newCode;
  });
  
  const [referralCount, setReferralCount] = useState(() => {
    const saved = localStorage.getItem('referralCount');
    return saved ? parseInt(saved) : 0;
  });

  const applyReferralCode = (code: string) => {
    if (code !== referralCode) {
      addPoints(100);
      toast.success('Referral code applied! You earned 100 points!');
      setReferralCount(prev => prev + 1);
      localStorage.setItem('referralCount', (referralCount + 1).toString());
    } else {
      toast.error("You can't use your own referral code!");
    }
  };

  useEffect(() => {
    localStorage.setItem('userPoints', points.toString());
    localStorage.setItem('earnedPoints', earnedPoints.toString());
    localStorage.setItem('redeemedPoints', redeemedPoints.toString());
    localStorage.setItem('redeemedProducts', JSON.stringify([...redeemedProductIds]));
  }, [points, earnedPoints, redeemedPoints, redeemedProductIds]);

  useEffect(() => {
    const currentMilestone = MILESTONES.find(m => earnedPoints >= m.points);
    const previousMilestone = MILESTONES.find(m => earnedPoints - lastEarnedAmount >= m.points);
    
    if (currentMilestone && currentMilestone !== previousMilestone) {
      addPoints(currentMilestone.reward);
      // Show celebration notification
    }
  }, [earnedPoints, lastEarnedAmount]);

  const addPoints = (amount: number) => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 3);
    
    setPointsBatches(prev => [...prev, { amount, expiryDate }]);
    setPoints(prev => prev + amount);
    setEarnedPoints(prev => prev + amount);
    setLastEarnedAmount(amount); // Track last earned amount
  };

  const removePoints = (amount: number) => {
    const newPoints = Math.max(0, points - amount);
    setPoints(newPoints);
    setRedeemedPoints(prev => prev + amount);
  };

  const addRedeemedProduct = (productId: number) => {
    setRedeemedProductIds(prev => new Set(prev).add(productId));
  };

  const addToHistory = (entry: Omit<PointsHistory, 'id' | 'timestamp'>) => {
    const newEntry: PointsHistory = {
      ...entry,
      id: Date.now(),
      timestamp: new Date()
    };
    setPointsHistory(prev => [...prev, newEntry]);
  };

  // Check for expired points daily
  useEffect(() => {
    const checkExpiry = () => {
      const now = new Date();
      const validBatches = pointsBatches.filter(batch => 
        batch.expiryDate > now
      );
      if (validBatches.length !== pointsBatches.length) {
        setPointsBatches(validBatches);
        // Update total points accordingly
      }
    };

    const interval = setInterval(checkExpiry, 86400000); // 24 hours
    return () => clearInterval(interval);
  }, []);

  // Save profile to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <PointsContext.Provider value={{ 
      points, 
      earnedPoints, 
      redeemedPoints,
      redeemedProductIds,
      pointsHistory,
      userProfile,
      addPoints, 
      removePoints,
      addRedeemedProduct,
      addToHistory,
      updateProfile,
      referralCode,
      referralCount,
      generateReferralCode: () => {
        const newCode = generateRandomCode();
        setReferralCode(newCode);
        localStorage.setItem('referralCode', newCode);
        return newCode;
      },
      applyReferralCode,
    }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
}; 