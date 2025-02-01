import React from 'react';
import { Clock, Award } from 'lucide-react';

const VideoInfo = () => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-900">How to Maximize Your Earnings</h1>
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <Clock className="h-4 w-4 mr-1" />
        <span>5:30</span>
        <span className="mx-2">•</span>
        <Award className="h-4 w-4 mr-1" />
        <span className="text-indigo-600 font-medium">+50 points on completion</span>
      </div>
      <p className="mt-4 text-gray-600">
        Learn the best strategies to maximize your earnings on our platform. This video covers essential tips for both watching videos and shopping through our affiliate partners.
      </p>
    </div>
  );
};

export default VideoInfo;