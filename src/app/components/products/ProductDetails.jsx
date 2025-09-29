// components/products/ProductDetails.jsx
'use client';
import React, { useState } from 'react';
import { useCart } from '../../lib/context/CartContext';
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, Plus, Minus } from 'lucide-react';

export default function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // You can add a toast notification here
    alert(`${quantity} ${product.name} added to cart!`);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  const mainImage = product.images?.[selectedImage]?.src || '/placeholder-image.jpg';
  const galleryImages = product.images || [];

  const isOnSale = product.on_sale && product.regular_price && product.regular_price !== product.price;
  const salePercentage = isOnSale 
    ? Math.round((1 - product.price / product.regular_price) * 100)
    : 0;

  // Format description with better styling
  const formatDescription = (html) => {
    if (!html) return '';
    
    // Add styling to lists and headings
    return html
      .replace(/<ul>/g, '<ul class="space-y-2 my-6">')
      .replace(/<ol>/g, '<ol class="space-y-2 my-6 list-decimal list-inside">')
      .replace(/<li>/g, '<li class="flex items-start"><span class="text-[#F6DFC4] mr-3 mt-1">•</span>')
      .replace(/<h[1-6]>/g, '<h2 class="text-xl font-bold my-6 text-black">')
      .replace(/<\/h[1-6]>/g, '</h2>')
      .replace(/<p>/g, '<p class="mb-6 leading-relaxed">');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-3xl bg-gray-50 shadow-lg relative group">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Sale Badge */}
            {isOnSale && (
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  -{salePercentage}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Image Gallery */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square overflow-hidden rounded-2xl transition-all duration-300 ${
                    selectedImage === index 
                      ? 'ring-2 ring-[#F6DFC4] ring-offset-2' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.src}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          {/* Title and Categories */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-black leading-tight">
              {product.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {product.categories?.map(category => (
                <span
                  key={category.id}
                  className="bg-[#F6DFC4] text-black px-4 py-2 rounded-full text-sm font-medium"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-black">
                ${product.price}
              </span>
              {product.regular_price && product.regular_price !== product.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.regular_price}
                </span>
              )}
            </div>
            {isOnSale && (
              <span className="text-green-600 font-semibold">
                You save ${(product.regular_price - product.price).toFixed(2)}!
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className={`w-3 h-3 rounded-full ${
              product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className={`font-semibold ${
              product.stock_status === 'instock' ? 'text-green-700' : 'text-red-700'
            }`}>
              {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.stock_quantity && (
              <span className="text-gray-600 text-sm">
                • {product.stock_quantity} units available
              </span>
            )}
          </div>

          {/* Short Description */}
          {product.short_description && (
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: formatDescription(product.short_description) }}
                className="text-gray-700 leading-8"
              />
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg text-black">Quantity:</span>
              <div className="flex items-center gap-4">
                <button 
                  className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#F6DFC4] transition-colors duration-300 disabled:opacity-30"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-bold w-12 text-center bg-gray-50 py-2 rounded-lg">
                  {quantity}
                </span>
                <button 
                  className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#F6DFC4] transition-colors duration-300"
                  onClick={increaseQuantity}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_status !== 'instock'}
                className="col-span-2 bg-black text-white hover:bg-gray-800 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={24} />
                {product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                onClick={toggleWishlist}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-200 text-red-500' 
                    : 'border-gray-200 hover:border-[#F6DFC4] text-gray-600'
                }`}
              >
                <Heart size={24} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-lg text-black mb-4">Product Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-[#F6DFC4] transition-colors duration-300"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck size={20} className="text-[#F6DFC4]" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RotateCcw size={20} className="text-[#F6DFC4]" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield size={20} className="text-[#F6DFC4]" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Share2 size={20} className="text-[#F6DFC4]" />
              <span>Share Product</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description */}
      {product.description && (
        <div className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Product Description</h2>
          <div 
            className="prose prose-lg max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: formatDescription(product.description) }}
          />
        </div>
      )}

      {/* Additional Information */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Attributes */}
        {product.attributes && product.attributes.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-black mb-6">Product Details</h3>
            <div className="space-y-4">
              {product.attributes.map((attr, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <span className="font-semibold text-black">{attr.name}:</span>
                  <span className="text-gray-700 text-right">{attr.options.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-black mb-6">Shipping & Returns</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#F6DFC4] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <Truck size={12} className="text-black" />
              </div>
              <span className="text-gray-700 leading-relaxed">Free shipping on orders over $50</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#F6DFC4] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <RotateCcw size={12} className="text-black" />
              </div>
              <span className="text-gray-700 leading-relaxed">30-day hassle-free return policy</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#F6DFC4] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <ShoppingCart size={12} className="text-black" />
              </div>
              <span className="text-gray-700 leading-relaxed">Cash on delivery available</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#F6DFC4] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <Shield size={12} className="text-black" />
              </div>
              <span className="text-gray-700 leading-relaxed">Secure SSL encrypted payment processing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}