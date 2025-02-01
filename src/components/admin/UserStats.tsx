import React from 'react';
import { Users, DollarSign, Award, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '12,345', change: '+12%', icon: Users },
  { name: 'Points Awarded', value: '1.2M', change: '+8%', icon: Award },
  { name: 'Revenue Generated', value: '$45,678', change: '+15%', icon: DollarSign },
  { name: 'Active Users', value: '8,901', change: '+5%', icon: TrendingUp },
];

const UserStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50">
              <stat.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-green-600">{stat.change}</span>
            <span className="text-sm text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;