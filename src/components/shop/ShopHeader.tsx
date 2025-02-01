import React from 'react';
import { ShoppingBag } from 'lucide-react';

const ShopHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shop & Earn</h1>
        <p className="mt-2 text-gray-600">Earn points on every purchase through our partner stores</p>
      </div>
      <div className="flex items-center space-x-2 text-indigo-600">
        <ShoppingBag className="h-5 w-5" />
        <span className="font-medium">2x Points Today!</span>
      </div>
    </div>
  );
};

export default ShopHeader;