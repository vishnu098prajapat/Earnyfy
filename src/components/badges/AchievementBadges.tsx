import { Medal, Award, Star, Bell, Flame } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  requirement: number;
  type: 'videos' | 'subscriptions' | 'streak';
  reward: number;
}

const achievements: Achievement[] = [
  {
    id: 'bronze_watcher',
    title: 'Bronze Watcher',
    description: 'Watch 10 videos',
    icon: <Medal className="w-8 h-8 text-bronze" />,
    requirement: 10,
    type: 'videos',
    reward: 50
  },
  {
    id: 'silver_watcher',
    title: 'Silver Watcher',
    description: 'Watch 50 videos',
    icon: <Medal className="w-8 h-8 text-silver" />,
    requirement: 50,
    type: 'videos',
    reward: 200
  },
  {
    id: 'gold_watcher',
    title: 'Gold Watcher',
    description: 'Watch 100 videos',
    icon: <Medal className="w-8 h-8 text-gold" />,
    requirement: 100,
    type: 'videos',
    reward: 500
  },
  {
    id: 'supporter',
    title: 'Supporter',
    description: 'First Channel Subscription',
    icon: <Bell className="w-8 h-8 text-purple-500" />,
    requirement: 1,
    type: 'subscriptions',
    reward: 100
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: '7 Days Streak',
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    requirement: 7,
    type: 'streak',
    reward: 300
  }
];

interface AchievementBadgesProps {
  watchedCount: number;
  subscriptionCount: number;
  currentStreak: number;
  completedBadges: string[];
  onBadgeComplete: (achievement: Achievement) => void;
}

const AchievementBadges = ({ 
  watchedCount, 
  subscriptionCount, 
  currentStreak,
  completedBadges,
  onBadgeComplete 
}: AchievementBadgesProps) => {
  useEffect(() => {
    // Check for newly completed badges
    achievements.forEach(achievement => {
      const progress = (() => {
        switch (achievement.type) {
          case 'videos':
            return watchedCount;
          case 'subscriptions':
            return subscriptionCount;
          case 'streak':
            return currentStreak;
        }
      })();

      if (progress >= achievement.requirement && !completedBadges.includes(achievement.id)) {
        onBadgeComplete(achievement);
      }
    });
  }, [watchedCount, subscriptionCount, currentStreak, completedBadges]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Achievements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const progress = (() => {
            switch (achievement.type) {
              case 'videos':
                return watchedCount;
              case 'subscriptions':
                return subscriptionCount;
              case 'streak':
                return currentStreak;
            }
          })();

          const isCompleted = progress >= achievement.requirement;

          return (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                isCompleted 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {achievement.description}
                  </p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                    Reward: ₹{achievement.reward}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{
                      width: `${Math.min((progress / achievement.requirement) * 100, 100)}%`
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {progress} / {achievement.requirement}
                </p>
              </div>
              {isCompleted && (
                <div className="absolute -top-2 -right-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementBadges; 