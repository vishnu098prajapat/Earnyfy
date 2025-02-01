import { useState } from 'react';

export interface PointsActivity {
  id: string;
  type: 'hover' | 'click' | 'purchase' | 'redeem';
  points: number;
  timestamp: Date;
  productId?: number;
  description: string;
}

export const usePoints = () => {
  const [points, setPoints] = useState(0);
  const [activities, setActivities] = useState<PointsActivity[]>([]);

  const addPoints = (amount: number, type: PointsActivity['type'], productId?: number) => {
    setPoints(prev => prev + amount);
    
    const activity: PointsActivity = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      points: amount,
      timestamp: new Date(),
      productId,
      description: getActivityDescription(type, amount)
    };
    
    setActivities(prev => [activity, ...prev]);
  };

  const redeemPoints = (amount: number): boolean => {
    if (points >= amount) {
      setPoints(prev => prev - amount);
      const activity: PointsActivity = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'redeem',
        points: -amount,
        timestamp: new Date(),
        description: `Redeemed ${amount} points`
      };
      setActivities(prev => [activity, ...prev]);
      return true;
    }
    return false;
  };

  const getActivityDescription = (type: PointsActivity['type'], amount: number): string => {
    switch (type) {
      case 'hover':
        return `Earned ${amount} points for product view`;
      case 'click':
        return `Earned ${amount} points for product interaction`;
      case 'purchase':
        return `Earned ${amount} points from purchase`;
      case 'redeem':
        return `Redeemed ${amount} points`;
      default:
        return `Points adjustment: ${amount}`;
    }
  };

  return {
    points,
    activities,
    addPoints,
    redeemPoints
  };
};