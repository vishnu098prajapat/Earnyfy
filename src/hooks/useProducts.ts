import { useState } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  points: number;
  rating: number;
  image: string;
  store: string;
  category: string;
  affiliateUrl: string;
}

export const useProducts = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 1499,
      points: 150,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      store: 'Amazon',
      category: 'electronics',
      affiliateUrl: 'https://amazon.com/headphones'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 999,
      points: 100,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      store: 'Amazon',
      category: 'electronics',
      affiliateUrl: 'https://amazon.com/watch'
    },
    {
      id: 3,
      name: 'Premium Coffee Maker',
      price: 799,
      points: 80,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      store: 'Amazon',
      category: 'home',
      affiliateUrl: 'https://amazon.com/coffee'
    }
  ]);

  return { products };
};