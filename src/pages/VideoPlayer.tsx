import VideoContent from '../components/video/VideoContent';
import VideoInfo from '../components/video/VideoInfo';
import RelatedVideos from '../components/video/RelatedVideos';

const VideoPlayer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoContent />
          <VideoInfo />
        </div>
        <div className="lg:col-span-1">
          <RelatedVideos />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;