// components/products/ProductsGrid.jsx
'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';

export default function ProductsGrid({ categorySlug }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        setLoading(true);
        console.log('Fetching products for category:', categorySlug);
        
        const response = await fetch(`/api/categories/products?slug=${categorySlug}`);
        const data = await response.json();
        
        console.log('API Response:', response.status, data);
        
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.error || 'Failed to fetch products');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    if (categorySlug) {
      fetchCategoryProducts();
    }
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-error">
        <p>{error}</p>
        <button 
          className="btn btn-primary mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className=''>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
  );
}