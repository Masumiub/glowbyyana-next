// components/cart/OrderSummary.jsx
'use client';
import React, { useState } from 'react';
import { useCart } from '../../lib/context/CartContext';

export default function OrderSummary() {
  const { items, getCartTotal, getCartItemsCount } = useCart();
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Calculate costs
  const subtotal = getCartTotal();
  const shippingCost = shippingMethod === 'express' ? 15 : shippingMethod === 'standard' ? 8 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  const shippingOptions = [
    { value: 'free', label: 'Free Shipping', cost: 0, days: '7-10 business days' },
    { value: 'standard', label: 'Standard Shipping', cost: 8, days: '5-7 business days' },
    { value: 'express', label: 'Express Shipping', cost: 15, days: '2-3 business days' },
  ];

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Order Summary</h2>
        
        {/* Items Count */}
        <div className="flex justify-between text-sm mb-2">
          <span>Items ({getCartItemsCount()})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping Options */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Shipping Method</label>
          <div className="space-y-2">
            {shippingOptions.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value={option.value}
                  checked={shippingMethod === option.value}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="radio radio-primary"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-sm">
                      {option.cost === 0 ? 'Free' : `$${option.cost}`}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{option.days}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Promo Code (Optional) */}
        <div className="mt-4">
          <details className="collapse collapse-arrow border border-base-300">
            <summary className="collapse-title text-sm font-medium">Have a promo code?</summary>
            <div className="collapse-content">
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="input input-bordered join-item flex-1"
                />
                <button className="btn btn-outline join-item">Apply</button>
              </div>
            </div>
          </details>
        </div>

        {/* Security Badge */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}