import React from 'react';
import { Gift, TrendingUp } from 'lucide-react';

const RewardsBanner = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg shadow-lg">
      <div className="px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Gift className="h-12 w-12 text-white" />
          <div className="ml-4 text-white">
            <h3 className="text-xl font-bold">Double Points Weekend!</h3>
            <p className="mt-1">Earn 2x points on all purchases until Sunday</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-white" />
          <span className="text-white font-medium">12,450 points earned by shoppers today</span>
        </div>
      </div>
    </div>
  );
};

export default RewardsBanner;