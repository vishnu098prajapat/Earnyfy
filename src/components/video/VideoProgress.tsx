import React from 'react';

interface VideoProgressProps {
  progress: number;
  currentTime: string;
  duration: string;
}

const VideoProgress: React.FC<VideoProgressProps> = ({ progress, currentTime, duration }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2">
      <div className="relative h-1 bg-gray-600 rounded">
        <div 
          className="absolute h-full bg-indigo-600 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-white">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default VideoProgress;