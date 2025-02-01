import React, { useState, useEffect } from 'react';
import { Plus, Trash, Edit, Link, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getProductInfoFromUrl, validateAffiliateUrl } from '../utils/productUtils';

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
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newAffiliateUrl, setNewAffiliateUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = async () => {
    if (!validateAffiliateUrl(newAffiliateUrl)) {
      toast.error('Please enter a valid Amazon or Flipkart URL');
      return;
    }

    setLoading(true);
    try {
      const productInfo = await getProductInfoFromUrl(newAffiliateUrl);
      
      if (!productInfo) {
        toast.error('Could not fetch product information');
        return;
      }

      const newProduct: Product = {
        id: Date.now(),
        name: productInfo.title,
        points: Math.round((productInfo.affiliatePrice - productInfo.price) * 10), // Example points calculation
        discount: Math.round(((productInfo.affiliatePrice - productInfo.price) / productInfo.affiliatePrice) * 100) + '%',
        image: productInfo.image,
        rating: 4.5, // Default rating
        earnPoints: Math.round(productInfo.price * 0.1), // Example earn points calculation
        actualPrice: productInfo.price,
        affiliatePrice: productInfo.affiliatePrice,
        affiliateLink: productInfo.affiliateLink,
        redeemedCount: 0,
        purchaseCount: 0
      };

      setProducts(prev => [...prev, newProduct]);
      setNewAffiliateUrl('');
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    setProducts(prev => 
      prev.map(p => p.id === editingProduct.id ? editingProduct : p)
    );
    setEditingProduct(null);
    toast.success('Product updated successfully!');
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

          {/* Add Product Form */}
          <div className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newAffiliateUrl}
                onChange={(e) => setNewAffiliateUrl(e.target.value)}
                placeholder="Paste Amazon or Flipkart affiliate URL"
                className="flex-1 px-4 py-2 border rounded-lg"
                disabled={loading}
              />
              <button
                onClick={handleAddProduct}
                disabled={loading || !newAffiliateUrl}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                <Plus className="w-5 h-5" />
                <span>{loading ? 'Adding...' : 'Add Product'}</span>
              </button>
            </div>
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg p-4">
                {editingProduct?.id === product.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="px-3 py-2 border rounded"
                        placeholder="Product Name"
                      />
                      <input
                        type="number"
                        value={editingProduct.points}
                        onChange={(e) => setEditingProduct({...editingProduct, points: Number(e.target.value)})}
                        className="px-3 py-2 border rounded"
                        placeholder="Points"
                      />
                      <input
                        type="number"
                        value={editingProduct.actualPrice}
                        onChange={(e) => setEditingProduct({...editingProduct, actualPrice: Number(e.target.value)})}
                        className="px-3 py-2 border rounded"
                        placeholder="Actual Price"
                      />
                      <input
                        type="number"
                        value={editingProduct.affiliatePrice}
                        onChange={(e) => setEditingProduct({...editingProduct, affiliatePrice: Number(e.target.value)})}
                        className="px-3 py-2 border rounded"
                        placeholder="Affiliate Price"
                      />
                      <input
                        type="text"
                        value={editingProduct.affiliateLink}
                        onChange={(e) => setEditingProduct({...editingProduct, affiliateLink: e.target.value})}
                        className="px-3 py-2 border rounded col-span-2"
                        placeholder="Affiliate Link"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 border rounded-lg flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="text-sm text-gray-500">
                        Points: {product.points} • Price: ₹{product.actualPrice} • Affiliate: ₹{product.affiliatePrice}
                      </div>
                      <div className="text-sm text-gray-500">
                        Redeemed: {product.redeemedCount} • Purchased: {product.purchaseCount}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
