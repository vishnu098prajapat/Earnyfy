import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePoints } from './PointsContext';

interface DailyRewards {
  day: number;
  points: number;
}

const DAILY_REWARDS: DailyRewards[] = [
  { day: 1, points: 5 },   // Day 1: ₹5
  { day: 2, points: 10 },  // Day 2: ₹10
  { day: 3, points: 20 },  // Day 3: ₹20
  { day: 4, points: 25 },  // Day 4: ₹25
  { day: 5, points: 30 },  // Day 5: ₹30
  { day: 6, points: 40 },  // Day 6: ₹40
  { day: 7, points: 50 },  // Day 7: ₹50
];

interface DailyRewardsContextType {
  currentDay: number;
  canClaimToday: boolean;
  claimDailyReward: () => void;
  nextReward: number;
  timeUntilNextClaim: string | null;
  streak: number;
}

const DailyRewardsContext = createContext<DailyRewardsContextType | undefined>(undefined);

export const DailyRewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addPoints } = usePoints();
  const [currentDay, setCurrentDay] = useState(() => {
    const saved = localStorage.getItem('dailyRewardsDay');
    return saved ? parseInt(saved) : 1;
  });
  const [lastClaimDate, setLastClaimDate] = useState<Date | null>(() => {
    const saved = localStorage.getItem('lastClaimDate');
    return saved ? new Date(saved) : null;
  });
  const [streak, setStreak] = useState(() => {
    // Initialize streak based on currentDay
    const saved = localStorage.getItem('dailyRewardsDay');
    return saved ? parseInt(saved) : 1;
  });
  const [timeUntilNextClaim, setTimeUntilNextClaim] = useState<string | null>(null);

  // Update time until next claim every second
  useEffect(() => {
    const updateTimeUntilNextClaim = () => {
      if (!lastClaimDate || canClaimToday()) {
        setTimeUntilNextClaim(null);
        return;
      }

      const now = new Date();
      const nextClaimTime = new Date(lastClaimDate);
      nextClaimTime.setHours(nextClaimTime.getHours() + 24);
      
      const diff = nextClaimTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeUntilNextClaim(null);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilNextClaim(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    const timer = setInterval(updateTimeUntilNextClaim, 1000);
    updateTimeUntilNextClaim(); // Initial update

    return () => clearInterval(timer);
  }, [lastClaimDate]);

  const canClaimToday = () => {
    if (!lastClaimDate) return true;

    const now = new Date();
    const lastClaim = new Date(lastClaimDate);
    const timeDiff = now.getTime() - lastClaim.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Check if 24 hours have passed
    return hoursDiff >= 24;
  };

  const checkAndUpdateStreak = () => {
    if (!lastClaimDate) return;

    const now = new Date();
    const lastClaim = new Date(lastClaimDate);
    const timeDiff = now.getTime() - lastClaim.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // If more than 48 hours have passed, reset both streak and currentDay
    if (hoursDiff > 48) {
      setStreak(1);
      setCurrentDay(1);
      localStorage.setItem('dailyRewardsDay', '1');
    }
  };

  // Check streak every minute
  useEffect(() => {
    const timer = setInterval(checkAndUpdateStreak, 60000);
    checkAndUpdateStreak(); // Initial check
    return () => clearInterval(timer);
  }, [lastClaimDate]);

  const claimDailyReward = () => {
    if (canClaimToday()) {
      const now = new Date();
      const reward = DAILY_REWARDS[currentDay - 1];
      
      // Add bonus points for maintaining streak
      const streakBonus = Math.floor((currentDay - 1) / 7) * 5; // +5 points for every completed week
      const totalPoints = reward.points + streakBonus;
      
      addPoints(totalPoints);
      setLastClaimDate(now);
      
      // Update both currentDay and streak together
      if (currentDay === 7) {
        setCurrentDay(1);
        setStreak(1);
      } else {
        const nextDay = currentDay + 1;
        setCurrentDay(nextDay);
        setStreak(nextDay);
      }

      // Show notification with streak bonus if any
      if (streakBonus > 0) {
        console.log(`Claimed ₹${reward.points} + ₹${streakBonus} streak bonus!`);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('dailyRewardsDay', currentDay.toString());
    if (lastClaimDate) {
      localStorage.setItem('lastClaimDate', lastClaimDate.toISOString());
    }
  }, [currentDay, lastClaimDate]);

  const nextReward = DAILY_REWARDS[currentDay - 1]?.points || 0;

  return (
    <DailyRewardsContext.Provider value={{
      currentDay,
      canClaimToday: canClaimToday(),
      claimDailyReward,
      nextReward,
      timeUntilNextClaim,
      streak: currentDay // Use currentDay as streak
    }}>
      {children}
    </DailyRewardsContext.Provider>
  );
};

export const useDailyRewards = () => {
  const context = useContext(DailyRewardsContext);
  if (context === undefined) {
    throw new Error('useDailyRewards must be used within a DailyRewardsProvider');
  }
  return context;
};