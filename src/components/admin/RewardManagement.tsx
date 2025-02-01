import React from 'react';
import { Gift, Plus } from 'lucide-react';

const rewards = [
  {
    id: 1,
    name: '$10 Amazon Gift Card',
    points: 1000,
    stock: 50,
  },
  {
    id: 2,
    name: '$25 Walmart Gift Card',
    points: 2500,
    stock: 30,
  },
  {
    id: 3,
    name: '$50 Target Gift Card',
    points: 5000,
    stock: 20,
  },
];

const RewardManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Reward Management</h3>
        <button className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-1" />
          Add Reward
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {rewards.map((reward) => (
          <div key={reward.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-indigo-600" />
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{reward.name}</h4>
                  <p className="mt-1 text-sm text-gray-500">{reward.points} points required</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Stock: {reward.stock}
                </div>
                <button className="mt-1 text-sm text-indigo-600 hover:text-indigo-900">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardManagement;