import { useNavigate } from 'react-router-dom';
import { ShoppingBag, TrendingUp } from 'lucide-react';

const SHOP_OFFERS = [
  {
    id: 1,
    name: 'Amazon Shopping',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60',
    cashback: '10%',
    gradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'
  },
  {
    id: 2,
    name: 'Walmart Deals',
    logo: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60',
    cashback: '8%',
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
  }
];

const ShopOffers = () => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/shop');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <ShoppingBag className="h-6 w-6 mr-2 text-primary-500" />
          Shop & Earn
        </h2>
        <button
          onClick={handleShopClick}
          className="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SHOP_OFFERS.map(offer => (
          <div 
            key={offer.id}
            onClick={handleShopClick}
            className={`group cursor-pointer bg-gradient-to-br ${offer.gradient} rounded-lg p-4 hover:shadow-md transition-all`}
          >
            <div className="flex items-center space-x-3">
              <img 
                src={offer.logo}
                alt={offer.name}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500">
                  {offer.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Earn up to {offer.cashback} cashback
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shop Now Button */}
      <button
        onClick={handleShopClick}
        className="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        <ShoppingBag className="h-5 w-5" />
        <span>Shop Now</span>
        <TrendingUp className="h-5 w-5 ml-1" />
      </button>

      <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
        Shop through our platform and earn points on every purchase
      </p>
    </div>
  );
};

export default ShopOffers;