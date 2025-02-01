import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import { auth, storage } from '../config/firebase';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AchievementBadges from '../components/badges/AchievementBadges';
import { usePoints } from '../context/PointsContext';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addPoints } = usePoints();

  const [watchedCount, setWatchedCount] = useState(() => {
    const watched = localStorage.getItem('watchedVideos');
    return watched ? JSON.parse(watched).length : 0;
  });

  const [subscriptionCount, setSubscriptionCount] = useState(() => {
    const subscribed = localStorage.getItem('subscribedChannels');
    return subscribed ? JSON.parse(subscribed).length : 0;
  });

  const [currentStreak, setCurrentStreak] = useState(() => {
    const streak = localStorage.getItem('dailyStreak');
    return streak ? JSON.parse(streak).days : 0;
  });

  const [completedBadges, setCompletedBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedBadges');
    return saved ? JSON.parse(saved) : [];
  });

  const handleImageUpload = async (file: File) => {
    try {
      // Basic validations
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      setIsUploading(true);
      
      // Create a unique filename
      const fileName = `profile_${user?.id}_${Date.now()}`;
      const storageRef = ref(storage, `profile-images/${user?.id}/${fileName}`);
      
      // Set metadata to enable caching and compression
      const metadata = {
        contentType: 'image/jpeg',
        cacheControl: 'public,max-age=7200'
      };

      // Direct upload to Firebase
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const photoURL = await getDownloadURL(snapshot.ref);
      
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: photoURL
        });

        // Update local state and storage together
        const updatedUser = {
          ...user!,
          photo: photoURL
        };
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        toast.success('Profile updated!');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      // Show loading state
      const loadingToast = toast.loading('Updating name...');

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });

        // Immediately update local state
        const updatedUser = {
          ...user!,
          name: name
        };
        
        // Update all states simultaneously
        Promise.all([
          // Update AuthContext state
          setUser(updatedUser),
          // Update localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser))
        ]);

        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Name updated!', {
          duration: 2000,
          position: 'top-center'
        });
      }
    } catch (error: any) {
      console.error('Error updating name:', error);
      toast.error(error.message || 'Failed to update name');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleBadgeComplete = (achievement: Achievement) => {
    if (!completedBadges.includes(achievement.id)) {
      addPoints(achievement.reward);
      setCompletedBadges(prev => [...prev, achievement.id]);
      
      toast.success(`🎉 Achievement Unlocked: ${achievement.title}! You earned ₹${achievement.reward}!`, {
        duration: 5000,
        position: 'top-center'
      });

      localStorage.setItem('completedBadges', JSON.stringify([...completedBadges, achievement.id]));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profile Settings</h2>
        
        {/* Profile Picture */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-primary-500 ring-offset-2"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center ring-2 ring-primary-500 ring-offset-2">
                  <User className="h-12 w-12 text-white" />
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg transition-all duration-200 transform group-hover:scale-110
                  ${isUploading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
              >
                {isUploading ? (
                  <div className="h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
            {isUploading && (
              <p className="text-sm text-gray-500">Uploading...</p>
            )}
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Name
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your name"
            />
            <button
              onClick={handleNameUpdate}
              disabled={!name.trim() || name === user?.name}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 
                ${!name.trim() || name === user?.name
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                }`}
            >
              Save
            </button>
          </div>
        </div>

        {/* Email (Read-only) */}
        <div className="max-w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <div className="relative bg-gray-50 dark:bg-gray-600 rounded-lg overflow-hidden">
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-transparent text-gray-500 dark:text-gray-400 focus:outline-none"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className="h-5 w-5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Achievement Badges */}
      <div className="mt-8">
        <AchievementBadges
          watchedCount={watchedCount}
          subscriptionCount={subscriptionCount}
          currentStreak={currentStreak}
          completedBadges={completedBadges}
          onBadgeComplete={handleBadgeComplete}
        />
      </div>
    </div>
  );
};

export default Profile; 