import React from 'react';
import { ShoppingCart, X } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  points: number;
  quantity: number;
}

interface Props {
  items: CartItem[];
  onRemove: (id: number) => void;
}

const CartPreview: React.FC<Props> = ({ items, onRemove }) => {
  const totalPoints = items.reduce((sum, item) => sum + item.points * item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
        </div>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>
      
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">${item.price * item.quantity}</p>
                <p className="text-sm text-indigo-600">+{item.points * item.quantity} pts</p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Total Points:</span>
          <span className="font-medium text-indigo-600">+{totalPoints} pts</span>
        </div>
        <div className="flex justify-between mt-2 text-base font-medium text-gray-900">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPreview;