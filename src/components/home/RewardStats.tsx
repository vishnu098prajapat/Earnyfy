import React from 'react';
import { DollarSign, Users, Gift } from 'lucide-react';

const stats = [
  { id: 1, name: 'Total Rewards Paid', value: '$2.5M+', icon: DollarSign },
  { id: 2, name: 'Active Users', value: '50K+', icon: Users },
  { id: 3, name: 'Rewards Claimed', value: '100K+', icon: Gift },
];

const RewardStats = () => {
  return (
    <div className="bg-indigo-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by users worldwide
          </h2>
          <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
            Join our community of earners and start your reward journey today
          </p>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                {stat.name}
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                <div className="flex justify-center items-center">
                  <stat.icon className="h-8 w-8 mr-2" />
                  {stat.value}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default RewardStats;