import React from 'react';
import { Video, ShoppingBag, Gift, DollarSign } from 'lucide-react';

const features = [
  {
    name: 'Watch & Earn',
    description: 'Earn points by watching curated videos. The longer you watch, the more you earn.',
    icon: Video,
  },
  {
    name: 'Shop & Earn',
    description: 'Get cashback and points on every purchase through our platform.',
    icon: ShoppingBag,
  },
  {
    name: 'Redeem Rewards',
    description: 'Convert your points into gift cards, cashback, or exclusive discounts.',
    icon: Gift,
  },
  {
    name: 'Instant Cashback',
    description: 'Receive your cashback directly to your account within 24 hours.',
    icon: DollarSign,
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Better ways to earn rewards
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Choose how you want to earn rewards. Watch videos, shop online, or do both to maximize your earnings.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;