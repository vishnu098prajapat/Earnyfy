import { FilterState } from '../hooks/useFilters';

export interface Product {
  id: number;
  name: string;
  price: number;
  points: number;
  rating: number;
  image: string;
  store: string;
  category: string;
}

export const filterProducts = (products: Product[], filters: FilterState) => {
  return products.filter(product => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Price filter
    if (filters.minPrice !== null && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && product.price > filters.maxPrice) {
      return false;
    }

    // Store filter
    if (filters.stores.length > 0 && !filters.stores.includes(product.store)) {
      return false;
    }

    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'points-high':
      return sorted.sort((a, b) => b.points - a.points);
    case 'points-low':
      return sorted.sort((a, b) => a.points - b.points);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};