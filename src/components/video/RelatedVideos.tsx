import { Clock, Award, Play, Eye } from 'lucide-react';
import { usePoints } from '../../context/PointsContext';
import { useState } from 'react';

const videos = [
  {
    id: 1,
    title: 'Smart Shopping Guide',
    duration: '8:15',
    points: 80,
    views: 1200,
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
    isWatched: false,
    description: 'Learn how to maximize your shopping rewards'
  },
  {
    id: 2,
    title: 'Top Earning Strategies',
    duration: '6:45',
    points: 65,
    views: 980,
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d',
    isWatched: false,
    description: 'Discover the best ways to earn points'
  },
  {
    id: 3,
    title: 'Redeem Points Wisely',
    duration: '10:20',
    points: 100,
    views: 1500,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
    isWatched: false,
    description: 'Make the most of your earned points'
  }
];

const RelatedVideos = () => {
  const { points, addPoints } = usePoints();
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());

  const handleVideoClick = (videoId: number) => {
    if (!watchedVideos.has(videoId)) {
      const video = videos.find(v => v.id === videoId);
      if (video) {
        addPoints(video.points);
        setWatchedVideos(prev => new Set(prev).add(videoId));
      }
    }
  };

  return (
    <div className="bg-white dark:bg-background-dark rounded-lg shadow-lg">
      <div className="px-6 py-5 border-b border-primary-200 dark:border-primary-900">
        <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100">
          Related Videos
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-300 mt-1">
          Watch videos to earn points
        </p>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {videos.map((video) => (
            <div 
              key={video.id} 
              onClick={() => handleVideoClick(video.id)}
              className="group flex space-x-4 hover:bg-primary-50 dark:hover:bg-primary-900/30 p-3 rounded-lg transition-all cursor-pointer"
            >
              <div className="relative flex-shrink-0 w-32 h-20">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                  <Play className="h-8 w-8 text-white opacity-80 group-hover:opacity-100" />
                </div>
                {watchedVideos.has(video.id) && (
                  <div className="absolute top-1 right-1 bg-green-500 text-white p-1 rounded-full">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-primary-900 dark:text-primary-100 truncate group-hover:text-primary-600">
                  {video.title}
                </h4>
                <p className="text-xs text-primary-600 dark:text-primary-300 mt-1 line-clamp-2">
                  {video.description}
                </p>
                <div className="mt-2 flex items-center text-xs text-primary-500 dark:text-primary-400 space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    <span className="text-secondary-500">+{video.points} pts</span>
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

export default RelatedVideos;