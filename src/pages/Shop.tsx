import React, { useState, useEffect } from 'react';
import { ShoppingBag, Gift, Star, TrendingUp, Coins, Share, HelpCircle } from 'lucide-react';
import { usePoints } from '../context/PointsContext';
import { useRedeemedProducts } from '../hooks/useRedeemedProducts';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  points: number;
  discount: string;
  image: string;
  rating: number;
  earnPoints: number;
  actualPrice: number;
  affiliatePrice: number;
  affiliateLink: string;
  redeemedCount: number;
  purchaseCount: number;
  lastRedeemed?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Headphones',
    points: 2500,
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    rating: 4.5,
    earnPoints: 150,
    actualPrice: 1499,
    affiliatePrice: 1999,
    affiliateLink: 'https://amazon.com/headphones',
    redeemedCount: 1250,
    purchaseCount: 850,
    lastRedeemed: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Smart Watch',
    points: 3000,
    discount: '15%',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    rating: 4.8,
    earnPoints: 200,
    actualPrice: 2599,
    affiliatePrice: 3999,
    affiliateLink: 'https://amazon.com/smart-watch',
    redeemedCount: 1500,
    purchaseCount: 1000
  },
  {
    id: 3,
    name: 'Wireless Earbuds',
    points: 1800,
    discount: '25%',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    rating: 4.6,
    earnPoints: 120,
    actualPrice: 1399,
    affiliatePrice: 1999,
    affiliateLink: 'https://amazon.com/wireless-earbuds',
    redeemedCount: 900,
    purchaseCount: 600
  },
  {
    id: 4,
    name: 'Gaming Console',
    points: 5000,
    discount: '10%',
    image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500',
    rating: 4.9,
    earnPoints: 300,
    actualPrice: 4500,
    affiliatePrice: 5999,
    affiliateLink: 'https://amazon.com/gaming-console',
    redeemedCount: 2500,
    purchaseCount: 1500
  },
  {
    id: 5,
    name: 'Fitness Tracker',
    points: 1500,
    discount: '30%',
    image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500',
    rating: 4.3,
    earnPoints: 100,
    actualPrice: 1099,
    affiliatePrice: 1999,
    affiliateLink: 'https://amazon.com/fitness-tracker',
    redeemedCount: 750,
    purchaseCount: 500
  },
  {
    id: 6,
    name: 'Bluetooth Speaker',
    points: 2000,
    discount: '18%',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    rating: 4.7,
    earnPoints: 180,
    actualPrice: 1699,
    affiliatePrice: 2499,
    affiliateLink: 'https://amazon.com/bluetooth-speaker',
    redeemedCount: 1000,
    purchaseCount: 700
  }
];

const Shop = () => {
  const { points, addPoints, removePoints } = usePoints();
  const { isProductRedeemed, addRedeemedProduct } = useRedeemedProducts();
  
  const [hoveredProducts, setHoveredProducts] = useState<Set<number>>(new Set());
  const [redeemPoints, setRedeemPoints] = useState<{ [key: number]: number }>({});

  const handleProductHover = (productId: number) => {
    if (!hoveredProducts.has(productId)) {
      addPoints(5);
      setHoveredProducts(prev => new Set(prev).add(productId));
    }
  };

  const handleRedeemChange = (productId: number, points: string) => {
    const numPoints = Number(points);
    const product = products.find(p => p.id === productId);
    
    if (product) {
      const exactPointsNeeded = product.affiliatePrice - product.actualPrice;
      
      setRedeemPoints(prev => ({
        ...prev,
        [productId]: numPoints
      }));
    }
  };

  const calculateFinalPrice = (product: Product) => {
    const redeemedPoints = redeemPoints[product.id] || 0;
    return product.affiliatePrice - redeemedPoints;
  };

  const isBuyButtonEnabled = (product: Product) => {
    const redeemedPoints = redeemPoints[product.id] || 0;
    const requiredPoints = product.affiliatePrice - product.actualPrice;
    return redeemedPoints === requiredPoints;
  };

  const handlePurchase = (product: Product) => {
    // Open affiliate link in new tab
    window.open(product.affiliateLink, '_blank');
    toast.success('Opening product page in new tab!');
  };

  const handleRedeem = (productId: number) => {
    if (isProductRedeemed(productId.toString())) {
      toast.error('You have already redeemed this product!');
      return;
    }

    const product = products.find(p => p.id === productId);
    const inputPoints = redeemPoints[productId];
    
    if (product) {
      const exactPointsNeeded = product.affiliatePrice - product.actualPrice;
      
      if (inputPoints !== exactPointsNeeded) {
        toast.error(`Please enter exactly ${exactPointsNeeded} points for this product`);
        return;
      }

      if (points >= exactPointsNeeded) {
        removePoints(exactPointsNeeded);
        addRedeemedProduct(productId.toString(), exactPointsNeeded);
        toast.success(`Successfully redeemed ${exactPointsNeeded} points! You can now buy at discounted price.`);
        
        setRedeemPoints(prev => ({
          ...prev,
          [productId]: 0
        }));

        // Automatically open the buy link after successful redemption
        handlePurchase(product);
      } else {
        toast.error('You don\'t have enough points');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, productId: number) => {
    if (e.key === 'Enter') {
      const inputPoints = redeemPoints[productId] || 0;
      handleRedeemSubmit(productId, inputPoints);
    }
  };

  const getRecommendedProducts = () => {
    const userPoints = points;
    return products
      .filter(p => !isProductRedeemed(p.id.toString()))
      .filter(p => (p.affiliatePrice - p.actualPrice) <= userPoints)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  const handleShare = (product: Product) => {
    const text = `Check out this amazing deal! I just saved ₹${redeemPoints[product.id]} using my points!`;
    const url = `${window.location.origin}/shop?product=${product.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Great Deal Alert!',
        text,
        url
      });
    } else {
      // Fallback to clipboard copy
      navigator.clipboard.writeText(`${text}\n${url}`);
      // Show success toast
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Points Display */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                <Coins className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Points</h2>
                <p className="text-3xl font-bold text-primary-500">{points}</p>
              </div>
            </div>
            <Link
              to="/how-it-works"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 dark:text-primary-100 dark:bg-primary-900 dark:hover:bg-primary-800 transition-colors"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              How it works
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden relative group"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
                {isProductRedeemed(product.id.toString()) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold px-4 py-2 rounded-full bg-green-500">
                      Already Redeemed
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Price:</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">₹{product.actualPrice}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{product.rating}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Points Input and Redeem Button */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Coins className="h-4 w-4" />
                      <span>Points needed: {product.affiliatePrice - product.actualPrice}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="number"
                        value={redeemPoints[product.id] || ''}
                        onChange={(e) => handleRedeemChange(product.id, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700 text-sm"
                        placeholder={`Enter ${product.affiliatePrice - product.actualPrice} points`}
                        disabled={isProductRedeemed(product.id.toString())}
                      />
                      
                      {!isProductRedeemed(product.id.toString()) ? (
                        <button
                          onClick={() => handleRedeem(product.id)}
                          disabled={!redeemPoints[product.id]}
                          className="w-full sm:w-auto px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-primary-500 hover:bg-primary-600 text-white"
                        >
                          Redeem Points
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchase(product)}
                          className="w-full sm:w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <ShoppingBag className="h-5 w-5" />
                          <span>Buy Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;