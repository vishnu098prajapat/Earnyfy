import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { filterProducts, sortProducts } from '../../utils/filterProducts';
import { FilterState } from '../../hooks/useFilters';

interface Props {
  filters: FilterState;
  sortBy: string;
}

const ProductGrid: React.FC<Props> = ({ filters, sortBy }) => {
  const { products } = useProducts();
  
  const filteredProducts = filterProducts(products, filters);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products match your filters.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Reset all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;