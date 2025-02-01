import React from 'react';
import { Filter } from 'lucide-react';

interface Props {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

const categories = [
  { id: 'electronics', name: 'Electronics', count: 124 },
  { id: 'fashion', name: 'Fashion', count: 86 },
  { id: 'home', name: 'Home & Garden', count: 67 },
  { id: 'beauty', name: 'Beauty', count: 43 },
  { id: 'sports', name: 'Sports', count: 35 },
];

const CategoryFilter: React.FC<Props> = ({ selectedCategories, onToggleCategory }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Categories</h2>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => onToggleCategory(category.id)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">{category.name}</span>
            <span className="ml-auto text-gray-500 text-sm">{category.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;