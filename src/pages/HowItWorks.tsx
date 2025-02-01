import { Play, DollarSign, Gift, Wallet } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Play className="w-12 h-12 text-blue-500" />,
      title: "Watch Videos",
      description: "Choose from our collection of videos and watch them completely to earn points."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-green-500" />,
      title: "Earn Points",
      description: "Earn up to ₹500 daily by watching videos. Points are credited instantly after watching."
    },
    {
      icon: <Gift className="w-12 h-12 text-purple-500" />,
      title: "Daily Rewards",
      description: "Get bonus rewards for watching videos daily and maintaining your streak."
    },
    {
      icon: <Wallet className="w-12 h-12 text-yellow-500" />,
      title: "Instant Withdrawal",
      description: "Withdraw your earnings instantly to your bank account or UPI ID."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start earning money by watching videos in just 4 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FAQItem 
              question="How much can I earn daily?"
              answer="You can earn up to ₹500 daily by watching videos and completing daily tasks."
            />
            <FAQItem 
              question="When can I withdraw my earnings?"
              answer="You can withdraw your earnings instantly once you reach the minimum withdrawal amount of ₹100."
            />
            <FAQItem 
              question="Is it safe and legitimate?"
              answer="Yes, we are a legitimate platform with 50,000+ happy users and have paid over ₹2Cr to our users."
            />
            <FAQItem 
              question="How do I get started?"
              answer="Simply click on 'Start Watching' button, create your account, and start watching videos to earn money."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
      {question}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {answer}
    </p>
  </div>
);

export default HowItWorks;
