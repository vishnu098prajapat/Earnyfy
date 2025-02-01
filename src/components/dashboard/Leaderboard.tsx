import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardUser {
  id: number;
  name: string;
  points: number;
  rank: number;
  avatar: string;
}

const Leaderboard = () => {
  // डेमो डेटा
  const topEarners: LeaderboardUser[] = [
    {
      id: 1,
      name: "Rahul Singh",
      points: 25000,
      rank: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1"
    },
    {
      id: 2,
      name: "Priya Patel",
      points: 22500,
      rank: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2"
    },
    {
      id: 3,
      name: "Amit Kumar",
      points: 21000,
      rank: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3"
    },
    {
      id: 4,
      name: "Neha Sharma",
      points: 19500,
      rank: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4"
    },
    {
      id: 5,
      name: "Raj Verma",
      points: 18000,
      rank: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <Award className="h-6 w-6 text-blue-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-background-dark rounded-lg shadow">
      <div className="px-6 py-5 border-b border-primary-200 dark:border-primary-900">
        <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100">
          Top Earners This Week
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {topEarners.map((user) => (
            <div 
              key={user.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getRankIcon(user.rank)}
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rank #{user.rank}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-500">
                  ₹{user.points.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  earned
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 