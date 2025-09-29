// components/cart/CartItem.jsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from '../../lib/context/CartContext';
import Image from 'next/image';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const increaseQuantity = () => handleQuantityChange(item.quantity + 1);
  const decreaseQuantity = () => handleQuantityChange(item.quantity - 1);

  const subtotal = item.price * item.quantity;

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 mb-4">
      <div className="card-body p-4">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <Link href={`/products/${item.slug}`} className="flex-shrink-0">
            <div className="w-20 h-20 bg-base-200 rounded-lg overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-base-300 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No Image</span>
                </div>
              )}
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/products/${item.slug}`}>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                {item.name}
              </h3>
            </Link>
            <p className="text-lg font-bold text-primary mt-1">${item.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="join">
              <button
                className="btn btn-outline btn-sm join-item"
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="join-item px-4 flex items-center bg-base-200 min-w-12 justify-center">
                {item.quantity}
              </span>
              <button
                className="btn btn-outline btn-sm join-item"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right min-w-20">
              <p className="font-bold text-lg">${subtotal.toFixed(2)}</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-outline btn-sm"
              onClick={decreaseQuantity}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 bg-base-200 rounded">{item.quantity}</span>
            <button
              className="btn btn-outline btn-sm"
              onClick={increaseQuantity}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          <div className="text-right">
            <p className="font-bold text-lg">${subtotal.toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="btn btn-ghost btn-sm text-error mt-1"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}