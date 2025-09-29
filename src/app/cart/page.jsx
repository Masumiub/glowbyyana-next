// app/cart/page.js
'use client';

import Link from 'next/link';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { useCart } from '../lib/context/CartContext';

export default function CartPage() {
  const { items, getCartTotal, getCartItemsCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Continue shopping to add items to your cart</p>
        <Link href="/" className="bg-pink-500 text-white px-6 py-3 rounded-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <OrderSummary />
          <Link 
            href="/checkout" 
            className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg text-center block mt-4"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}