// components/ui/ProductCard.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../lib/context/CartContext';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    
    // Add subtle animation feedback
    e.target.classList.add('scale-95');
    setTimeout(() => {
      e.target.classList.remove('scale-95');
    }, 150);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const isOnSale = product.on_sale && product.regular_price && product.regular_price !== product.price;
  const salePercentage = isOnSale 
    ? Math.round((1 - product.price / product.regular_price) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#F6DFC4] overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-64 w-full bg-gray-100">

            <Image
              src={product.images?.[0]?.src || "/placeholder-image.jpg"}
              alt={product.name} width={250} height={250}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={toggleWishlist}
            className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
          </button>
          
          <Link 
            href={`/products/${product.slug}`}
            className="p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-300"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -{salePercentage}%
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {product.stock_status === 'outofstock' && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Add Button */}
        {product.stock_status !== 'outofstock' && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <button 
              className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg text-black mb-2 line-clamp-2 transition-colors duration-300 cursor-pointer leading-tight">
            {product.name}
          </h3>
        </Link>
        
        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-1">
          {product.categories?.slice(0, 2).map(category => (
            <span 
              key={category.id}
              className="bg-[#F6DFC4] text-black px-2 py-1 rounded-full text-xs font-medium"
            >
              {category.name}
            </span>
          ))}
          {product.categories && product.categories.length > 2 && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              +{product.categories.length - 2}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">
              ${product.price}
            </span>
            {isOnSale && (
              <span className="text-lg text-gray-500 line-through">
                ${product.regular_price}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          {product.stock_status === 'instock' && product.stock_quantity > 0 && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              In Stock
            </span>
          )}
        </div>

        {/* Rating (if available) */}
        {product.average_rating && (
          <div className="flex items-center gap-1 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
                    star <= product.average_rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.rating_count || 0})
            </span>
          </div>
        )}
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#F6DFC4] transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
    </div>
  );
}