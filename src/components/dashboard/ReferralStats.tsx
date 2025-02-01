import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Users, Award, Clock, TrendingUp } from 'lucide-react';

interface ReferralStat {
  _id: string;
  count: number;
  totalEarned: number;
}

interface Referee {
  _id: string;
  name: string;
  photo: string;
}

interface Referral {
  _id: string;
  referee: Referee;
  status: string;
  earnedPoints: number;
  createdAt: string;
  milestones: Array<{
    name: string;
    points: number;
    completedAt: string;
  }>;
}

const ReferralStats = () => {
  const { data, isLoading } = useQuery('referralStats', async () => {
    const response = await axios.get('/api/referrals/stats');
    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const stats: ReferralStat[] = data?.stats || [];
  const recentReferrals: Referral[] = data?.recentReferrals || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center mb-6">
        <Users className="h-6 w-6 mr-2 text-primary-500" />
        Your Referral Performance
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Total Referrals"
          value={stats.reduce((acc, stat) => acc + stat.count, 0)}
          color="text-blue-500"
        />
        <StatCard
          icon={<Award className="h-6 w-6" />}
          label="Completed"
          value={stats.find(s => s._id === 'completed')?.count || 0}
          color="text-green-500"
        />
        <StatCard
          icon={<Clock className="h-6 w-6" />}
          label="Pending"
          value={stats.find(s => s._id === 'pending')?.count || 0}
          color="text-yellow-500"
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          label="Total Earned"
          value={`₹${stats.reduce((acc, stat) => acc + stat.totalEarned, 0)}`}
          color="text-purple-500"
        />
      </div>

      {/* Recent Referrals */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Referrals</h3>
        <div className="space-y-4">
          {recentReferrals.map(referral => (
            <div 
              key={referral._id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={referral.referee.photo || '/default-avatar.png'}
                  alt={referral.referee.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{referral.referee.name}</h4>
                  <p className="text-sm text-gray-500">
                    Joined {new Date(referral.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  referral.status === 'rewarded' ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  {referral.status === 'rewarded' ? 'Completed' : 'Pending'}
                </div>
                <div className="text-sm text-gray-500">
                  Earned: ₹{referral.earnedPoints}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
    <div className={`${color} mb-2`}>{icon}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

export default ReferralStats; 