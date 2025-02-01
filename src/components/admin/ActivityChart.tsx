import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ActivityChart = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Activity Overview</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500">Video Watches</h4>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">2,450</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                <ArrowUp className="h-4 w-4 flex-shrink-0 self-center" />
                <span className="ml-1">12.5%</span>
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500">Shop Visits</h4>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">1,832</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                <ArrowDown className="h-4 w-4 flex-shrink-0 self-center" />
                <span className="ml-1">3.2%</span>
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500">Points Awarded</h4>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">45.2K</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                <ArrowUp className="h-4 w-4 flex-shrink-0 self-center" />
                <span className="ml-1">8.1%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;