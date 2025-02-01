import { usePoints } from '../../context/PointsContext';
import { Coins, TrendingUp, ShoppingBag } from 'lucide-react';

const PointsSummary = () => {
  const { points, earnedPoints, redeemedPoints } = usePoints();

  return (
    <div className="bg-white dark:bg-background-dark rounded-lg shadow">
      <div className="px-6 py-5 border-b border-primary-200 dark:border-primary-900">
        <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100">
          Points Summary
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg">
              <Coins className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-300">Available Points</p>
              <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                {points.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-300">Earned Points</p>
              <p className="text-2xl font-bold text-green-500">
                +{earnedPoints.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-300">Redeemed Points</p>
              <p className="text-2xl font-bold text-blue-500">
                {redeemedPoints.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSummary;