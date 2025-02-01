import { useState } from 'react';
import { Play, Trophy, TrendingUp, Star, Heart, Eye, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usePoints } from '../context/PointsContext';
import GameStartAnimation from '../components/animations/GameStartAnimation';

const HomePage = () => {
  const navigate = useNavigate();
  const [showStartAnimation, setShowStartAnimation] = useState(false);

  const handleStartWatching = () => {
    setShowStartAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowStartAnimation(false);
    navigate('/videos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Animation */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in">
              Watch & Earn Daily
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Start watching videos and earn up to ₹500 daily. Join our growing community of 50,000+ earners!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleStartWatching}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 touch-manipulation"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-150 group-hover:scale-100" />
                <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 relative z-10" />
                <span className="relative z-10">Start Watching</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
              </button>
              <Link 
                to="/how-it-works"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold text-base sm:text-lg hover:bg-white/10 transition-all flex items-center justify-center space-x-2 active:scale-95 touch-manipulation"
              >
                <Play className="h-5 w-5 sm:h-5 sm:w-5" />
                <span>How It Works</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <div className="grid grid-cols-2 gap-4 animate-float-slow opacity-50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-lg" />
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <div className="grid grid-cols-2 gap-4 animate-float-slow-reverse opacity-50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard 
              icon={<Eye className="h-8 w-8" />}
              value="₹500"
              label="Daily Earning"
              color="text-green-500"
            />
            <StatCard 
              icon={<Heart className="h-8 w-8" />}
              value="50K+"
              label="Happy Users"
              color="text-pink-500"
            />
            <StatCard 
              icon={<Trophy className="h-8 w-8" />}
              value="₹2Cr+"
              label="Paid to Users"
              color="text-yellow-500"
            />
            <StatCard 
              icon={<Clock className="h-8 w-8" />}
              value="Instant"
              label="Withdrawals"
              color="text-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Add Game Start Animation */}
      <GameStartAnimation 
        isVisible={showStartAnimation}
        onAnimationComplete={handleAnimationComplete}
      />
    </div>
  );
};

// Helper Components
const StatCard = ({ icon, value, label, color }: { 
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
    <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-50 dark:bg-gray-900 ${color}`}>
      {icon}
    </div>
    <div className={`text-2xl md:text-3xl font-bold mb-1 ${color}`}>
      {value}
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {label}
    </div>
  </div>
);

export default HomePage;