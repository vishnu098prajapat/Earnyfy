import React from 'react';
import PointsSummary from '../components/dashboard/PointsSummary';
import ShopOffers from '../components/dashboard/ShopOffers';
import Leaderboard from '../components/dashboard/Leaderboard';
import DailyRewards from '../components/dashboard/DailyRewards';
import ReferralSystem from '../components/dashboard/ReferralSystem';
import { usePoints } from '../context/PointsContext';

const Dashboard = () => {
  const { points } = usePoints();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DailyRewards />
          <PointsSummary />
          <ShopOffers />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <ReferralSystem />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;