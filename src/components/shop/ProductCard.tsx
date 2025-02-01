import React, { useState } from 'react';
import { ExternalLink, Star, Tag, ShoppingCart } from 'lucide-react';
import { usePoints } from '../../hooks/usePoints';

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    points: number;
    rating: number;
    image: string;
    store: string;
    affiliateUrl: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const { points, redeemPoints } = usePoints();
  const [isHovered, setIsHovered] = useState(false);
  const pointsDiscount = Math.min(points, 100); // Max 100 points discount
  const discountedPrice = product.price - (pointsDiscount / 10); // 10 points = ₹1 discount

  const handleBuyNow = () => {
    if (pointsDiscount > 0) {
      redeemPoints(pointsDiscount);
    }
    window.open(product.affiliateUrl, '_blank');
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
          +{product.points} pts
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-gray-900 font-bold">₹{product.price}</div>
            {points > 0 && (
              <div className="text-sm text-green-600">
                Use {pointsDiscount} points to save ₹{pointsDiscount / 10}!
              </div>
            )}
            {pointsDiscount > 0 && (
              <div className="text-lg font-bold text-indigo-600">
                Final: ₹{discountedPrice}
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            {product.rating}
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500">via {product.store}</div>
        <button 
          onClick={handleBuyNow}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now {pointsDiscount > 0 && 'with Points'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;