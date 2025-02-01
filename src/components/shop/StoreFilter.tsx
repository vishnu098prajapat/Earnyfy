import React from 'react';
import { Store } from 'lucide-react';

interface Props {
  selectedStores: string[];
  onToggleStore: (store: string) => void;
}

const stores = [
  { id: 'amazon', name: 'Amazon', count: 156 },
  { id: 'walmart', name: 'Walmart', count: 89 },
  { id: 'bestbuy', name: 'Best Buy', count: 67 },
  { id: 'target', name: 'Target', count: 45 },
];

const StoreFilter: React.FC<Props> = ({ selectedStores, onToggleStore }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Store className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Stores</h2>
      </div>
      <div className="space-y-2">
        {stores.map((store) => (
          <label key={store.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedStores.includes(store.id)}
              onChange={() => onToggleStore(store.id)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">{store.name}</span>
            <span className="ml-auto text-gray-500 text-sm">{store.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StoreFilter;