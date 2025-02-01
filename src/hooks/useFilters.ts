import { useState } from 'react';

export interface FilterState {
  categories: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minPoints: number | null;
  stores: string[];
}

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minPrice: null,
    maxPrice: null,
    minPoints: null,
    stores: [],
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      minPrice: null,
      maxPrice: null,
      minPoints: null,
      stores: [],
    });
  };

  return { filters, updateFilter, toggleCategory, clearFilters };
};

export default useFilters;