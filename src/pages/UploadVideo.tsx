import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Upload, DollarSign } from 'lucide-react';

const UploadVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // वीडियो अपलोड म्यूटेशन
  const uploadMutation = useMutation(
    async (data: { video_url: string }) => {
      const response = await axios.post('/api/videos/upload', data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        // वीडियो अपलोड के बाद पेमेंट शुरू करें
        initiatePayment(data.video_id);
      },
      onError: () => {
        toast.error('Video upload failed');
      }
    }
  );

  // पेमेंट इनिशिएट करने का फंक्शन
  const initiatePayment = async (videoId: string) => {
    try {
      const response = await axios.post('/api/payments/initiate', {
        video_id: videoId,
        user_id: 'current_user_id' // यहाँ actual user ID डालें
      });

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: response.data.amount * 100,
        currency: 'INR',
        name: 'Earnify',
        description: 'Video Upload Payment',
        order_id: response.data.order_id,
        handler: async (response: any) => {
          try {
            await axios.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            toast.success('Payment successful!');
          } catch (error) {
            toast.error('Payment verification failed');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('Payment initiation failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      toast.error('Please enter a video URL');
      return;
    }
    setLoading(true);
    uploadMutation.mutate({ video_url: videoUrl });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-background-dark rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-6">
          Upload Your Video
        </h1>

        <div className="mb-8">
          <div className="bg-primary-50 dark:bg-primary-900/50 rounded-lg p-4">
            <h2 className="flex items-center text-lg font-medium text-primary-900 dark:text-primary-100">
              <DollarSign className="h-5 w-5 mr-2" />
              Upload Information
            </h2>
            <p className="mt-2 text-primary-600 dark:text-primary-300">
              Upload fee: ₹2000 per video
            </p>
            <ul className="mt-4 space-y-2 text-sm text-primary-600 dark:text-primary-300">
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2"></span>
                Only 5 videos can be uploaded per day on this platform
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2"></span>
                Payment required before video goes live
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2"></span>
                Secure payment through Razorpay
              </li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="videoUrl" 
              className="block text-sm font-medium text-primary-900 dark:text-primary-100 mb-2"
            >
              YouTube Video URL
            </label>
            <input
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste your YouTube video embed URL here"
              className="w-full px-4 py-2 rounded-lg border border-primary-200 dark:border-primary-700 bg-white dark:bg-background-dark text-primary-900 dark:text-primary-100"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !videoUrl}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium ${
              loading || !videoUrl
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600'
            } text-white transition-colors`}
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Upload Video
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo; 