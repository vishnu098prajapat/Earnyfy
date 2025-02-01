import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import VideoProgress from './VideoProgress';

const VideoContent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressInterval = useRef<number>();
  const totalDuration = 330; // 5:30 in seconds

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = window.setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          setProgress((newTime / totalDuration) * 100);
          
          if (newTime >= totalDuration) {
            setIsPlaying(false);
            clearInterval(progressInterval.current);
            // Here you would trigger points reward
            return totalDuration;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80"
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        <button 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="h-16 w-16 text-white" />
          ) : (
            <Play className="h-16 w-16 text-white" />
          )}
        </button>
      </div>
      <VideoProgress 
        progress={progress} 
        currentTime={formatTime(currentTime)}
        duration={formatTime(totalDuration)}
      />
    </div>
  );
}

export default VideoContent;