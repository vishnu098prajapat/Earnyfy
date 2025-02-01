import React from 'react';
import { Video, ShoppingBag, Gift } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'video',
    points: '+50',
    description: 'Watched "How to earn more points"',
    time: '2 hours ago',
    icon: Video,
  },
  {
    id: 2,
    type: 'purchase',
    points: '+200',
    description: 'Shopping at Amazon',
    time: '5 hours ago',
    icon: ShoppingBag,
  },
  {
    id: 3,
    type: 'redeem',
    points: '-1000',
    description: 'Redeemed $10 Gift Card',
    time: '2 days ago',
    icon: Gift,
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <activity.icon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <div className={`text-sm font-medium ${
                activity.points.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {activity.points} pts
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;