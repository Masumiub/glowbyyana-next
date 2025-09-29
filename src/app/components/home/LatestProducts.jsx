// components/home/LatestProducts.jsx
import React from 'react';
import ProductCard from '../ui/ProductCard';
import { getLatestProducts } from '../../lib/api/products';

export default async function LatestProducts() {
  try {
    const products = await getLatestProducts(8);
    
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Latest Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our newest arrivals and trending beauty essentials
            </p>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-lg">No products found at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-16">
            <button className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              View All Products
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error in LatestProducts:', error);
    
    return (
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-black">
            Latest <span className="text-[#F6DFC4]">Products</span>
          </h2>
          <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }
}