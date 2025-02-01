import React from 'react';
import { Play, Clock } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'How to Maximize Your Earnings',
    duration: '5:30',
    points: 50,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    title: 'Smart Shopping Guide',
    duration: '8:15',
    points: 80,
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const AvailableVideos = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Available Videos</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="group relative">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-900">{video.title}</h4>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {video.duration}
                  </div>
                  <div className="font-medium text-indigo-600">
                    +{video.points} pts
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableVideos;