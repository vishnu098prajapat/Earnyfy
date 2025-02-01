/// <reference types="youtube" />

declare global {
  interface Window {
    YT: YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

import { useState, useEffect, useRef } from 'react';
import { Play, Clock, Award, Eye } from 'lucide-react';
import { usePoints } from '../context/PointsContext';
import toast from 'react-hot-toast';

// प्री-लोड वीडियो डेटा
interface Video {
  id: number;
  title: string;
  embedUrl: string;
  thumbnail: string;
  duration: string;
  points: number;
  views: number;
  creator: string;
  description: string;
  channelId: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Sanam Teri Kasam - Title Song",
    embedUrl: "https://www.youtube.com/watch?v=xpqOO5gAhUo",
    thumbnail: "https://img.youtube.com/vi/xpqOO5gAhUo/maxresdefault.jpg",
    duration: "5:27",
    points: 10,
    views: 182000000,
    creator: "Eros Now Music",
    description: "Beautiful romantic song featuring Harshvardhan Rane & Mawra Hocane",
    channelId: "UCpXqJwQWxM7xJg7BYHCSw1w"
  },
  {
    id: 2,
    title: "Tum Hi Ho - Aashiqui 2",
    embedUrl: "https://www.youtube.com/watch?v=IJq0yyWug1k",
    thumbnail: "https://img.youtube.com/vi/IJq0yyWug1k/maxresdefault.jpg",
    duration: "4:22",
    points: 10,
    views: 223000000,
    creator: "T-Series",
    description: "Arijit Singh's soulful romantic song from Aashiqui 2",
    channelId: "UCq-Fj5jknLsUf-MWSy4_brA"
  },
  {
    id: 3,
    title: "Raataan Lambiyan - Shershaah",
    embedUrl: "https://www.youtube.com/watch?v=gvyUuxdRdR4",
    thumbnail: "https://img.youtube.com/vi/gvyUuxdRdR4/maxresdefault.jpg",
    duration: "3:50",
    points: 10,
    views: 456000000,
    creator: "Sony Music India",
    description: "Beautiful love song featuring Sidharth Malhotra & Kiara Advani",
    channelId: "UC56gTxNs4f9xZ7Pa2i5xNzg"
  },
  {
    id: 4,
    title: "Kesariya - Brahmastra",
    embedUrl: "https://www.youtube.com/watch?v=BddP6PYo2gs",
    thumbnail: "https://img.youtube.com/vi/BddP6PYo2gs/maxresdefault.jpg",
    duration: "4:28",
    points: 10,
    views: 378000000,
    creator: "Sony Music India",
    description: "Arijit Singh's melodious song featuring Ranbir & Alia",
    channelId: "UC56gTxNs4f9xZ7Pa2i5xNzg"
  }
];

interface VideoActions {
  liked: Set<number>;
  subscribed: Set<number>;
}

const Videos = () => {
  const { addPoints } = usePoints();
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(() => {
    const stored = localStorage.getItem('watchedVideos');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<YT.Player | null>(null);
  const progressInterval = useRef<NodeJS.Timeout>();
  const [videoActions, setVideoActions] = useState<VideoActions>({
    liked: new Set(),
    subscribed: new Set()
  });
  const lastTimeRef = useRef(0);
  const skippedRef = useRef<boolean>(false);
  const [completedVideos, setCompletedVideos] = useState<Set<number>>(new Set());

  useEffect(() => {
    localStorage.setItem('watchedVideos', JSON.stringify(Array.from(watchedVideos)));
  }, [watchedVideos]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        if (isPlaying) {
          initializePlayer();
        }
      };
    } else if (isPlaying) {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [selectedVideo, isPlaying]);

  useEffect(() => {
    skippedRef.current = false;
  }, [selectedVideo]);

  const initializePlayer = () => {
    if (isPlaying && !playerRef.current) {
      const videoId = getVideoIdFromUrl(selectedVideo.embedUrl);
      if (!videoId) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 0,
          rel: 0,
          showinfo: 1,
          iv_load_policy: 3,
          fs: 1,
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  };

  const getVideoIdFromUrl = (url: string) => {
    const match = url.match(/(?:watch\?v=|embed\/)([^&?]+)/);
    return match ? match[1] : '';
  };

  const onPlayerReady = () => {
    startProgressTracking();
  };

  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      if (!skippedRef.current && !completedVideos.has(selectedVideo.id)) {
        completeVideo(selectedVideo.id);
      }
    } else if (event.data === window.YT.PlayerState.PLAYING) {
      startProgressTracking();
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      stopProgressTracking();
    }
  };

  const startProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    skippedRef.current = false;
    toast.dismiss('skip-warning');
    
    progressInterval.current = setInterval(() => {
      if (playerRef.current) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          const playerState = playerRef.current.getPlayerState();
          
          // Only check for skipping if video is playing
          if (playerState === window.YT.PlayerState.PLAYING) {
            // Check if time difference is too large and it's not near the end of video
            if (Math.abs(currentTime - lastTimeRef.current) > 2 && 
                lastTimeRef.current !== 0 && 
                currentTime < duration - 2) {  // Ignore jumps near the end
              if (!skippedRef.current) {
                skippedRef.current = true;
                toast.error("Don't skip! Watch the full video to earn points.", {
                  id: 'skip-warning',
                  duration: 2000,
                  position: 'top-center',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                });
                
                setTimeout(() => {
                  toast.dismiss('skip-warning');
                }, 2000);
              }
            }
          }
          
          const newProgress = (currentTime / duration) * 100;
          setProgress(newProgress);
          
          // Update lastTime only if video is playing and not skipped
          if (!skippedRef.current && playerState === window.YT.PlayerState.PLAYING) {
            lastTimeRef.current = currentTime;
          }
        } catch (error) {
          console.error('Error tracking progress:', error);
        }
      }
    }, 500);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const handleVideoSelect = (video: typeof videos[0]) => {
    setSelectedVideo(video);
    setProgress(0);
    skippedRef.current = false;
    lastTimeRef.current = 0;
    toast.dismiss('skip-warning');
    setIsPlaying(false);
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
  };

  const completeVideo = (videoId: number) => {
    const video = videos.find(v => v.id === videoId);
    if (video && !completedVideos.has(videoId)) {
      setCompletedVideos(prev => new Set(prev).add(videoId));
      setWatchedVideos(prev => new Set(prev).add(videoId));
      
      addPoints(video.points);
      
      toast.success(`Congratulations! You earned ₹${video.points} points!`, {
        duration: 3000,
        icon: '🎉'
      });
    }
  };

  const handleLikeAction = async () => {
    try {
      if (!videoActions.liked.has(selectedVideo.id)) {
        const videoId = getVideoIdFromUrl(selectedVideo.embedUrl);
        const likeUrl = `https://m.youtube.com/watch?v=${videoId}`;
        
        window.open(likeUrl, '_blank');

        setTimeout(() => {
          if (!videoActions.liked.has(selectedVideo.id)) {
            addPoints(5);
            setVideoActions(prev => ({
              ...prev,
              liked: new Set(prev.liked).add(selectedVideo.id)
            }));
            
            toast.success('Thanks for liking! You earned ₹5!', {
              duration: 4000,
              icon: '👍'
            });
          }
        }, 10000);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleSubscribeAction = async () => {
    try {
      if (!videoActions.subscribed.has(selectedVideo.id)) {
        const subscribeUrl = `https://m.youtube.com/channel/${selectedVideo.channelId}?sub_confirmation=1`;
        
        window.open(subscribeUrl, '_blank');

        setTimeout(() => {
          if (!videoActions.subscribed.has(selectedVideo.id)) {
            addPoints(5);
            setVideoActions(prev => ({
              ...prev,
              subscribed: new Set(prev.subscribed).add(selectedVideo.id)
            }));
            
            toast.success('Thanks for subscribing! You earned ₹5!', {
              duration: 4000,
              icon: '🔔'
            });
          }
        }, 10000);
      }
    } catch (error) {
      console.error('Error handling subscribe:', error);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Video Container - Fixed height */}
              <div className="relative w-full h-[480px]">
                {!isPlaying ? (
                  <div className="absolute inset-0">
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setIsPlaying(true);
                        setTimeout(initializePlayer, 0);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 transition-opacity"
                    >
                      <Play className="h-16 w-16 text-white opacity-90" />
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <div 
                      id="youtube-player" 
                      className="w-full h-full"
                    />
                  </div>
                )}
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 z-10">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      skippedRef.current ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ 
                      width: `${progress}%`
                    }}
                  />
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedVideo.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      By {selectedVideo.creator}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <span className="text-green-500 font-medium">
                      +{selectedVideo.points} points for watching
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    💰 Earn Extra Points!
                  </h3>
                  <div className="space-y-4 text-sm text-blue-700 dark:text-blue-300">
                    <button
                      onClick={handleLikeAction}
                      disabled={videoActions.liked.has(selectedVideo.id)}
                      className={`w-full flex items-center justify-between p-2 rounded ${
                        videoActions.liked.has(selectedVideo.id)
                          ? 'bg-gray-100 text-gray-500'
                          : 'bg-white hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="inline-block w-6 text-center mr-2">👍</span>
                        Like this video
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">+5 points</span>
                        {videoActions.liked.has(selectedVideo.id) && (
                          <span className="ml-2 text-green-500">✓</span>
                        )}
                      </div>
                    </button>

                    <button
                      onClick={handleSubscribeAction}
                      disabled={videoActions.subscribed.has(selectedVideo.id)}
                      className={`w-full flex items-center justify-between p-2 rounded ${
                        videoActions.subscribed.has(selectedVideo.id)
                          ? 'bg-gray-100 text-gray-500'
                          : 'bg-white hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="inline-block w-6 text-center mr-2">🔔</span>
                        Subscribe to {selectedVideo.creator}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">+5 points</span>
                        {videoActions.subscribed.has(selectedVideo.id) && (
                          <span className="ml-2 text-green-500">✓</span>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{selectedVideo.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* साइड वीडियो लिस्ट */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Available Videos
              </h2>
              <div className="space-y-4">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className="w-full text-left group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex space-x-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-32 h-20 object-cover rounded-lg"
                          loading="lazy"
                        />
                        {watchedVideos.has(video.id) && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-md">
                            <svg 
                              className="w-4 h-4" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm ${
                          watchedVideos.has(video.id) 
                            ? 'text-gray-500 dark:text-gray-400' 
                            : 'text-gray-900 dark:text-white'
                        } group-hover:text-primary-500 line-clamp-2`}>
                          {video.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                          <Award className="h-3 w-3 text-green-500" />
                          <span>₹{video.points}</span>
                          <span>•</span>
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos; 