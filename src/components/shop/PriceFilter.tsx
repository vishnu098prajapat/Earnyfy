import React from 'react';
import { DollarSign } from 'lucide-react';

interface Props {
  minPrice: number | null;
  maxPrice: number | null;
  onMinChange: (value: number | null) => void;
  onMaxChange: (value: number | null) => void;
}

const PriceFilter: React.FC<Props> = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}) => {
  return (
    <div className="mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Price Range</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700">Min</label>
          <input
            type="number"
            min="0"
            value={minPrice || ''}
            onChange={(e) => onMinChange(e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Max</label>
          <input
            type="number"
            min="0"
            value={maxPrice || ''}
            onChange={(e) => onMaxChange(e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;