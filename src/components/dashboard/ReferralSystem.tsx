import { useState } from 'react';
import { usePoints } from '../../context/PointsContext';
import { Share2, Copy, Users, Gift, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const ReferralSystem = () => {
  const { referralCode, referralCount } = usePoints();
  
  // Generate referral link with user's code
  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join Earnify & Earn Money!',
      text: 'Join me on Earnify and get ₹100 bonus! Watch videos, shop, and earn daily.',
      url: referralLink
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopyLink();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Users className="h-6 w-6 mr-2 text-primary-500" />
          Refer & Earn
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Total Referrals: {referralCount}</span>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Gift className="h-8 w-8 text-primary-500" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Referral Rewards
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You get ₹100 for each friend who joins & completes tasks
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="inline-block w-6 text-center mr-2">🎁</span>
            Your friend gets ₹50 signup bonus
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="inline-block w-6 text-center mr-2">💰</span>
            You get ₹100 when they earn their first 500 points
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="inline-block w-6 text-center mr-2">🔄</span>
            No limit on number of referrals
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Referral Link
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleCopyLink}
              className="p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleShare}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            <span>Share Link</span>
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Join me on Earnify and get ₹50 bonus! ${referralLink}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            <span>Share on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Referrals
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {referralCount}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Earnings from Referrals
          </div>
          <div className="text-2xl font-bold text-green-500">
            ₹{referralCount * 100}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem; 