import { useState, useEffect } from 'react';

const STORAGE_KEY = 'redeemed_products';

interface RedeemedProduct {
  id: string;
  redeemedAt: string;
  points: number;
}

export const useRedeemedProducts = () => {
  const [redeemedProducts, setRedeemedProducts] = useState<RedeemedProduct[]>(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage whenever redeemedProducts changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(redeemedProducts));
  }, [redeemedProducts]);

  const isProductRedeemed = (productId: string): boolean => {
    return redeemedProducts.some(product => product.id === productId);
  };

  const addRedeemedProduct = (productId: string, points: number) => {
    if (!isProductRedeemed(productId)) {
      const newProduct: RedeemedProduct = {
        id: productId,
        redeemedAt: new Date().toISOString(),
        points: points
      };
      setRedeemedProducts(prev => [...prev, newProduct]);
      return true;
    }
    return false;
  };

  const getRedeemedProducts = () => redeemedProducts;

  const clearRedeemedProducts = () => {
    setRedeemedProducts([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    isProductRedeemed,
    addRedeemedProduct,
    getRedeemedProducts,
    clearRedeemedProducts
  };
};
