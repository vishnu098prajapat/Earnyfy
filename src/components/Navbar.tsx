import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Video, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Earnify</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/watch" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              <Video className="h-5 w-5 mr-1" />
              Watch & Earn
            </Link>
            <Link to="/shop" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              <ShoppingBag className="h-5 w-5 mr-1" />
              Shop & Earn
            </Link>
            <Link to="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;