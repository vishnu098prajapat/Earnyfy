import React from 'react';
import { UserPlus, Play, ShoppingCart, CreditCard } from 'lucide-react';

const steps = [
  {
    id: 1,
    name: 'Create Account',
    description: 'Sign up for free and complete your profile',
    icon: UserPlus,
  },
  {
    id: 2,
    name: 'Watch Videos',
    description: 'Start watching videos to earn your first points',
    icon: Play,
  },
  {
    id: 3,
    name: 'Shop Online',
    description: 'Shop through our platform for additional rewards',
    icon: ShoppingCart,
  },
  {
    id: 4,
    name: 'Get Rewarded',
    description: 'Redeem your points for cash or gift cards',
    icon: CreditCard,
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Getting Started
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </p>
        </div>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="bg-gray-50">
                  <div className="relative flex flex-col items-center">
                    <div className="rounded-full bg-indigo-600 p-3">
                      <step.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center">
                      <h3 className="text-lg font-medium text-gray-900">{step.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 max-w-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;