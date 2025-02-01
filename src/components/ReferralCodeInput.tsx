import { useState } from 'react';
import { usePoints } from '../context/PointsContext';
import { Send } from 'lucide-react';

const ReferralCodeInput = () => {
  const [code, setCode] = useState('');
  const { applyReferralCode } = usePoints();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      applyReferralCode(code.trim());
      setCode('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Have a Referral Code?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Code
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter referral code"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
            <button
              type="submit"
              disabled={!code.trim()}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Apply</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReferralCodeInput; 