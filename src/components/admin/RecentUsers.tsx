import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    joined: '2 days ago',
    points: 1250,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    joined: '5 days ago',
    points: 890,
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    joined: '1 week ago',
    points: 2100,
  },
];

const RecentUsers = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <div key={user.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-1" />
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-indigo-600">
                  {user.points} pts
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {user.joined}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;