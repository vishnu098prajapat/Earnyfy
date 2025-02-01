import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'points-high', label: 'Highest Points' },
  { value: 'points-low', label: 'Lowest Points' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'rating', label: 'Highest Rated' },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <ArrowUpDown className="h-5 w-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Sort by</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;