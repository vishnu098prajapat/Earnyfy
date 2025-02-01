import { Award, Gift, Clock, TrendingUp, Flame } from 'lucide-react';
import { useDailyRewards } from '../../context/DailyRewardsContext';
import { usePoints } from '../../context/PointsContext';

const DailyRewards = () => {
  const { points } = usePoints();
  const { currentDay, canClaimToday, claimDailyReward, nextReward, timeUntilNextClaim, streak } = useDailyRewards();

  const dailyRewards = [
    { day: 1, points: 5 },
    { day: 2, points: 10 },
    { day: 3, points: 20 },
    { day: 4, points: 25 },
    { day: 5, points: 30 },
    { day: 6, points: 40 },
    { day: 7, points: 50 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Gift className="h-6 w-6 mr-2 text-primary-500" />
          Daily Rewards
        </h2>
        {canClaimToday ? (
          <span className="text-sm text-green-500 animate-pulse">
            Reward Available!
          </span>
        ) : timeUntilNextClaim && (
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {timeUntilNextClaim}
          </span>
        )}
      </div>

      {/* Rewards Progress */}
      <div className="relative mb-8">
        <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700" />
        <div className="relative flex justify-between">
          {dailyRewards.map((reward, index) => (
            <div 
              key={reward.day}
              className={`flex flex-col items-center ${
                index + 1 < currentDay ? 'opacity-50' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                ${index + 1 === currentDay && canClaimToday
                  ? 'bg-primary-500 text-white animate-bounce'
                  : index + 1 < currentDay
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}
              >
                {index + 1 < currentDay ? (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  reward.day
                )}
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                ₹{reward.points}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Claim Button */}
      <div className="text-center">
        {canClaimToday ? (
          <button
            onClick={claimDailyReward}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto space-x-2"
          >
            <Gift className="h-5 w-5" />
            <span>Claim ₹{nextReward} Reward</span>
            {streak >= 7 && (
              <span className="ml-1 text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
                +₹{Math.floor(streak / 7) * 5} Bonus
              </span>
            )}
          </button>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            <Clock className="h-5 w-5 mx-auto mb-2" />
            <p>Next reward available in {timeUntilNextClaim}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                  {streak} Days
                </p>
                {streak >= 7 && (
                  <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center">
                    <Flame className="h-3 w-3 mr-1" />
                    +₹{Math.floor(streak / 7) * 5} Bonus
                  </span>
                )}
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-500" />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Week Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                Day {currentDay}/7
              </p>
            </div>
            <Award className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRewards;