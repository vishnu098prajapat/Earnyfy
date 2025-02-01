import React from 'react';
import UserStats from '../components/admin/UserStats';
import RecentUsers from '../components/admin/RecentUsers';
import RewardManagement from '../components/admin/RewardManagement';
import ActivityChart from '../components/admin/ActivityChart';

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="space-y-8">
        <UserStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentUsers />
          <RewardManagement />
        </div>
        <ActivityChart />
      </div>
    </div>
  );
};

export default AdminDashboard;